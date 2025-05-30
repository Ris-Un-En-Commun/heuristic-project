import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../domain/model/reservation.entity';

@Injectable()
export class DeleteReservationUseCase {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
  ) {
  }

  async execute(id: string): Promise<void> {
    const reservation = await this.reservationRepo.findOne({ where: { id } });

    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }

    await this.reservationRepo.delete(id);
  }
}