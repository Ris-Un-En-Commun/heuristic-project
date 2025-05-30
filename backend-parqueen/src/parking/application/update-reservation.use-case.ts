import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../domain/model/reservation.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { User } from '../../users/entities/user.entity';
import { ParkingSpot } from '../domain/model/parking-spot.entity';

@Injectable()
export class UpdateReservationUseCase {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ParkingSpot)
    private parkingSpotRepository: Repository<ParkingSpot>,
  ) {
  }

  async execute(id: string, dto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.reservationRepo.findOne({
      where: { id },
      relations: ['user', 'parkingSpot'],
    });

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
}