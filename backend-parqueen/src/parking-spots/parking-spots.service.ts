import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpot } from '../parking-spots/entities/parking-spot.entity';


@Injectable()
export class ParkingSpotsService {
      constructor(
        @InjectRepository(ParkingSpot)
        private parkingSpotRepository: Repository<ParkingSpot>,
      ) {}


    async create(createParkingSpotDto: any): Promise<ParkingSpot| ParkingSpot[]>  {
        const parkingSpot = this.parkingSpotRepository.create(createParkingSpotDto);
        return this.parkingSpotRepository.save(parkingSpot);
    }



}
