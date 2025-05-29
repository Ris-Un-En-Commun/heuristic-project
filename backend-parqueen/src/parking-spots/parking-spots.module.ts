import { Module,forwardRef } from '@nestjs/common';
import { ParkingSpotsController } from './parking-spots.controller';
import { ParkingSpotsService } from './parking-spots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ReservationsModule } from '../reservations/reservations.module';
import { Reservation } from '../reservations/entities/reservation.entity';

@Module({
  imports: [    TypeOrmModule.forFeature([ParkingSpot, Reservation]), 
], 
  controllers: [ParkingSpotsController],
  providers: [ParkingSpotsService],
  exports: [ParkingSpotsService, TypeOrmModule], 
})
export class ParkingSpotsModule {}
