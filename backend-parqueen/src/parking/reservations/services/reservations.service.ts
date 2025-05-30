import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Reservation } from '../../domain/model/reservation.entity';
import { CreateReservationDto } from '../../application/dto/create-reservation.dto';
import { UpdateReservationDto } from '../../application/dto/update-reservation.dto';
import { User } from '../../../users/entities/user.entity';
import { ParkingSpot } from '../../domain/model/parking-spot.entity';
import { addDays, format, isAfter, isToday, isWeekend, parseISO } from 'date-fns';
import { ParkingSpotsService } from '../../parking-spots/services/parking-spots.service';
import { In } from 'typeorm';

@Injectable()
export class ReservationsService {


  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ParkingSpot)
    private parkingSpotRepository: Repository<ParkingSpot>,
    @Inject(forwardRef(() => ParkingSpotsService))
    private parkingSpotsService: ParkingSpotsService,
  ) {
  }


  async findAll(): Promise<Reservation[]> {
    return this.reservationRepo.find();
  }

async create(dto: CreateReservationDto, userId:string): Promise<Reservation[]> {
  const {  startDate, endDate, isElectric } = dto;

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


  //découpage des dates
  const newReservationDates: string[] = [];
  for (let current = start; !isAfter(current, end); current = addDays(current, 1)) {
    if (!isWeekend(current)) {
      newReservationDates.push(format(current, 'yyyy-MM-dd'));
    }
  }

  const totalRequest = newReservationDates.length;
  const restingQuota = maxAllowed - existingFutureReservations;

  if (restingQuota==0) {
    throw new BadRequestException(
      `Vous avez déjà atteint le nombre maximum de réservations possibles : ${existingFutureReservations} . Vous ne pouvez pas faire de nouvelles réservations pour le moment.`
    );
  }

  if (totalRequest > restingQuota) {
    throw new BadRequestException(
      `Vous avez déjà ${existingFutureReservations} réservations à venir. Vous ne pouvez réserver que ${restingQuota} jours supplémentaire.`
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
      `Vous avez déjà une réservation pour les dates suivantes : ${conflictDates}`
    );
  }


  for (const dateStr of newReservationDates) {
    const availableSpot = await this.parkingSpotsService.getAvailableSpotForDate(isElectric, dateStr);
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

  


  async update(id: string, dto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.reservationRepo.findOne({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }

    if (dto.userId) {
      const user = await this.userRepository.findOne({ where: { id: dto.userId } });
      if (!user) {
        throw new NotFoundException(`Utilisateur avec id ${dto.userId} non trouvé`);
      }
      reservation.user = user;
    }

    if (dto.parkingSpotId) {
      const parkingSpot = await this.parkingSpotRepository.findOne({ where: { id: dto.parkingSpotId } });
      if (!parkingSpot) {
        throw new NotFoundException(`Place de parking avec id ${dto.parkingSpotId} non trouvée`);
      }
      reservation.parkingSpot = parkingSpot;
    }

    if (dto.date) {
      reservation.date = dto.date;
    }

    if (typeof dto.checkedIn === 'boolean') {
      reservation.checkedIn = dto.checkedIn;
    }

    return this.reservationRepo.save(reservation);
  }


  async remove(id: string): Promise<void> {
    await this.reservationRepo.delete(id);
  }


  async checkIn(id: string): Promise<{ message: string }> {
    const reservation = await this.reservationRepo.findOne({ where: { id } });

    if (!reservation) {
      throw new NotFoundException(`Réservation avec id ${id} non trouvée`);
    }

    reservation.checkedIn = true;
    await this.reservationRepo.save(reservation);
    return { message: `Check-in effectué'}` };
  }

}
