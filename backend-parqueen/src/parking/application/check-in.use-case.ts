import { Inject, Injectable } from '@nestjs/common/decorators/core';
import { RESERVATION_REPO } from '../infrastruture/tokens';
import { Repository } from 'typeorm';
import { Reservation } from '../domain/model/reservation.entity';
import { format, isToday, parseISO } from 'date-fns';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CheckIn {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {
  }

  async execute(reservationId: string): Promise<{ message: string; reservation: Reservation }> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['user', 'parkingSpot'],
    });

    if (!reservation) {
      throw new NotFoundException(`Réservation avec l'id ${reservationId} non trouvée`);
    }

    if (reservation.checkedIn) {
      throw new BadRequestException('Cette réservation a déjà été validée');
    }

    const reservationDate = parseISO(reservation.date);

    if (!isToday(reservationDate)) {
      throw new BadRequestException(
        `Le check-in n'est possible que le jour de la réservation (${format(reservationDate, 'dd/MM/yyyy')})`,
      );
    }

    reservation.checkedIn = true;
    const updatedReservation = await this.reservationRepository.save(reservation);

    return {
      message: `Check-in effectué avec succès pour la place ${reservation.parkingSpot.label}`,
      reservation: updatedReservation,
    };
  }
}