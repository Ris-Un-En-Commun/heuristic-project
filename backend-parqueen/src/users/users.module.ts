import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {ParkingModule} from "../parking/parking.module";
import {RESERVATION_REPO} from "../parking/infrastruture/tokens";
import {ReservationRepo} from "../parking/infrastruture/reservation-repo";
import {GetReservationForCheckInUseCase} from "../parking/application/get-reservation-for-check-in-use-case";
import {GetAllReservationsUseCase} from "../parking/application/get-all-reservations.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ParkingModule)],
  controllers: [UsersController],
  providers: [
      UsersService,
      ReservationRepo,
      { provide: RESERVATION_REPO, useExisting: ReservationRepo },

      GetReservationForCheckInUseCase,
      GetAllReservationsUseCase,
  ],
  exports: [UsersService, TypeOrmModule], 
})
export class UsersModule {}
