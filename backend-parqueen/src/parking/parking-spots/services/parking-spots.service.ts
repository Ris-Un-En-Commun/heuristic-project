import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpot } from '../../domain/model/parking-spot.entity';
import { Reservation } from '../../domain/model/reservation.entity';
import { addDays, format, getDay, isBefore } from 'date-fns';

@Injectable()
export class ParkingSpotsService {
  constructor(
    @InjectRepository(ParkingSpot)
    private parkingSpotRepository: Repository<ParkingSpot>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {
  }

  async getAvailableSpotForDate(isElectric: boolean, date: string): Promise<ParkingSpot | null> {
    const allSpots = await this.parkingSpotRepository.find({
      where: isElectric ? { isElectric: true } : {},
      relations: ['reservations'],
    });

    for (const spot of allSpots) {
      const hasReservation = await this.reservationRepository
        .createQueryBuilder('reservation')
        .where('reservation.parkingSpotId = :spotId', { spotId: spot.id })
        .andWhere('reservation.date = :date', { date })
        .getCount();

      if (hasReservation === 0) {
        return spot;
      }
    }

    return null;
  }
}
