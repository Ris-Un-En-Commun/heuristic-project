import { Module,forwardRef } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { UsersModule } from 'src/users/users.module';
import { ParkingModule } from 'src/parking/parking-spots/parking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]),
            UsersModule,
            forwardRef(()=> ParkingModule),],
             
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService, TypeOrmModule],
})
export class ReservationsModule {}
