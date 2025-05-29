import { Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { User } from '../users/entities/user.entity';
import { ParkingSpot } from '../parking-spots/entities/parking-spot.entity';  
import { addDays, format, isAfter, isToday, parseISO,isWeekend } from 'date-fns';

@Injectable()
export class ReservationsService {


  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ParkingSpot)
    private parkingSpotRepository: Repository<ParkingSpot>,
  ) {}




  async findAll(): Promise<Reservation[]> {
    return this.reservationRepo.find();
  }



  async create(dto: CreateReservationDto): Promise<Reservation[]> {
    const { userId, parkingSpotId, startDate, endDate } = dto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec id ${userId} non trouvé`);
    }

    const parkingSpot = await this.parkingSpotRepository.findOne({ where: { id: parkingSpotId } });
    if (!parkingSpot) {
      throw new NotFoundException(`Place de parking avec id ${parkingSpotId} non trouvée`);
    }

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const now = new Date();
    const reservations: Reservation[] = [];

    // créer une réservation pour chaque jour ouvrable
    for (let current = start; !isAfter(current, end); current = addDays(current, 1)) {
      if (isWeekend(current)) continue; 

      const checkedIn = isToday(current) && now.getHours() >= 11;

      const reservation = this.reservationRepo.create({
        user,
        parkingSpot,
        date: format(current, 'yyyy-MM-dd'),
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





}
