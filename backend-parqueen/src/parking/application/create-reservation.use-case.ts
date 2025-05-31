import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { Reservation } from '../domain/model/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '../../users/entities/user.entity';
import { ParkingSpot } from '../domain/model/parking-spot.entity';
import { addDays, format, isAfter, isToday, isWeekend, parseISO } from 'date-fns';
import { PARKING_SPOT_REPO } from '../infrastruture/tokens';
import { IParkingSpotRepository } from '../domain/ports/IParkingSpotRepository';


@Injectable()
export class CreateReservationUseCase {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(PARKING_SPOT_REPO)
    private parkingSpotRepo: IParkingSpotRepository,
  ) {
  }

  async execute(dto: CreateReservationDto, userId: string): Promise<Reservation[]> {
    const { startDate, endDate, isElectric } = dto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['reservations'],
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec id ${userId} non trouvé`);
    }

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const now = new Date();
    const reservations: Reservation[] = [];

    const MAX_RESERVATIONS = {
      user: 5,
      manager: 30,
      admin: 30,
    };

    const maxAllowed = MAX_RESERVATIONS[user.role];

    const existingFutureReservations = await this.reservationRepo.count({
      where: {
        user: { id: userId },
        date: MoreThanOrEqual(format(now, 'yyyy-MM-dd')),
      },
    });

    // Découpage des dates
    const newReservationDates: string[] = [];
    for (let current = start; !isAfter(current, end); current = addDays(current, 1)) {
      if (!isWeekend(current)) {
        newReservationDates.push(format(current, 'yyyy-MM-dd'));
      }
    }

    const totalRequest = newReservationDates.length;
    const restingQuota = maxAllowed - existingFutureReservations;

    if (restingQuota === 0) {
      throw new BadRequestException(
        `Vous avez déjà atteint le nombre maximum de réservations possibles : ${existingFutureReservations}. Vous ne pouvez pas faire de nouvelles réservations pour le moment.`,
      );
    }

    if (totalRequest > restingQuota) {
      throw new BadRequestException(
        `Vous avez déjà ${existingFutureReservations} réservations à venir. Vous ne pouvez réserver que ${restingQuota} jours supplémentaires.`,
      );
    }

    const existingDates = await this.reservationRepo.find({
      where: {
        user: { id: userId },
        date: In(newReservationDates),
      },
      select: ['date'],
    });

    if (existingDates.length > 0) {
      const conflictDates = existingDates.map(r => r.date).join(', ');
      throw new BadRequestException(
        `Vous avez déjà une réservation pour les dates suivantes : ${conflictDates}`,
      );
    }

    for (const dateStr of newReservationDates) {
      const availableSpot = await this.getAvailableSpotForDate(isElectric, dateStr);
      if (!availableSpot) {
        throw new NotFoundException(`Aucune place disponible pour le ${dateStr}`);
      }

      const currentDate = parseISO(dateStr);
      const checkedIn = isToday(currentDate) && now.getHours() >= 11;

      const reservation = this.reservationRepo.create({
        user,
        parkingSpot: availableSpot,
        date: dateStr,
        checkedIn,
      });

      reservations.push(reservation);
    }

    return this.reservationRepo.save(reservations);
  }

  private async getAvailableSpotForDate(isElectric: boolean, date: string): Promise<ParkingSpot | null> {
    const spots = await this.parkingSpotRepo.findAll(isElectric);

    const now = new Date();
    const isToday = format(now, 'yyyy-MM-dd') === date;
    const after11am = now.getHours() >= 11;

    const query = this.reservationRepo
      .createQueryBuilder('r')
      .select('r.parkingSpotId')
      .where('r.date = :date', { date });

    if (isToday && after11am) {
      query.andWhere('r.checkedIn = true');
    }

    const reservedSpotIds = await query.getRawMany();
    const reservedIds = reservedSpotIds.map(r => r.r_parkingSpotId);

    return spots.find(spot => !reservedIds.includes(spot.id)) || null;
  }

}