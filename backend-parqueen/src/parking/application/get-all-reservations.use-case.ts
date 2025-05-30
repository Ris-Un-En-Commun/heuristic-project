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

  async execute(): Promise<Reservation[]> {
    return this.reservationRepo.find({
      relations: ['user', 'parkingSpot'],
    });
  }
}