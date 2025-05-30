import { Module } from '@nestjs/common';
import { ParkingSpotsController } from './presentation/parking-spots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from './domain/model/parking-spot.entity';
import { Reservation } from './domain/model/reservation.entity';
import { ParkingSpotRepo } from './infrastruture/parking-spot-repo.service';
import { ReservationRepo } from './infrastruture/reservation-repo';
import { PARKING_SPOT_REPO, RESERVATION_REPO } from './infrastruture/tokens';
import { CheckAvailability } from './application/check-availability.use-case';
import { ReservationsController } from './presentation/reservations.controller';
import { CheckIn } from './application/check-in.use-case';
import { UsersModule } from '../users/users.module';
import { DeleteReservationUseCase } from './application/delete-reservation.use-case';
import { UpdateReservationUseCase } from './application/update-reservation.use-case';
import { GetAllReservationsUseCase } from './application/get-all-reservations.use-case';
import { CreateReservationUseCase } from './application/create-reservation.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpot, Reservation]),
    UsersModule,
  ],
  controllers: [ParkingSpotsController, ReservationsController],
  providers: [
    ParkingSpotRepo,
    ReservationRepo,
    { provide: PARKING_SPOT_REPO, useExisting: ParkingSpotRepo },
    { provide: RESERVATION_REPO, useExisting: ReservationRepo },

    /* Application-layer use-case */
    CheckAvailability,
    CreateReservationUseCase,
    GetAllReservationsUseCase,
    UpdateReservationUseCase,
    DeleteReservationUseCase,
    CheckIn,
  ],
  exports: [TypeOrmModule],
})
export class ParkingModule {
}
