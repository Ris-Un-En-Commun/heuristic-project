import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpot } from '../parking-spots/entities/parking-spot.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { format, addDays, isBefore,getDay } from 'date-fns';


@Injectable()
export class ParkingSpotsService {
      constructor(
        @InjectRepository(ParkingSpot)
        private parkingSpotRepository: Repository<ParkingSpot>,

        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>
      ) {}


    async create(createParkingSpotDto: any): Promise<ParkingSpot| ParkingSpot[]>  {
        const parkingSpot = this.parkingSpotRepository.create(createParkingSpotDto);
        return this.parkingSpotRepository.save(parkingSpot);
    }


async checkAvailability(isElectric: boolean, startDate: string, endDate: string): Promise<boolean> {
  const allSpots = await this.parkingSpotRepository.find({
    where: isElectric ? { isElectric: true } : {},
  });

  if (allSpots.length === 0) return false;

  const spotIds = allSpots.map(spot => spot.id);

  const dates: string[] = [];
  let current = new Date(startDate);
  const end = new Date(endDate);

  while (!isBefore(end, current)) {
    const day = getDay(current);
    if (day >= 1 && day <= 5) {
      dates.push(format(current, 'yyyy-MM-dd'));
    }
    current = addDays(current, 1);
  }

  for (const date of dates) {
    const reservationsCount = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.date = :date', { date })
      .andWhere('reservation.parkingSpotId IN (:...spotIds)', { spotIds })
      .getCount();

    if (reservationsCount >= allSpots.length) {
      return false;
    }
  }

  return true;
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
