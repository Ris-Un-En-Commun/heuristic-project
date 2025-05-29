import { Module,forwardRef } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { UsersModule } from 'src/users/users.module';
import { ParkingSpotsModule } from 'src/parking-spots/parking-spots.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]),
            UsersModule,
            forwardRef(()=> ParkingSpotsModule)], 
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
