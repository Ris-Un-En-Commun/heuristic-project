import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../domain/model/reservation.entity';

@Injectable()
export class GetAllReservationsUseCase {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
  ) {
  }

  async execute(userId: string|null = null): Promise<Reservation[]> {
    if (userId) {
      return this.reservationRepo.find({
        where: {user: {id: userId }},
        relations: ['user', 'parkingSpot'],
      });
    }

    return this.reservationRepo.find({
      relations: ['user', 'parkingSpot'],
    });
  }
}