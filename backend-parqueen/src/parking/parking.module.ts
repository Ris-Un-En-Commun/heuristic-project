import {forwardRef, Module} from '@nestjs/common';
import {ParkingSpotsController} from './presentation/parking-spots.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ParkingSpot} from './domain/model/parking-spot.entity';
import {Reservation} from './domain/model/reservation.entity';
import {ParkingSpotRepo} from './infrastruture/parking-spot-repo.service';
import {ReservationRepo} from './infrastruture/reservation-repo';
import {PARKING_SPOT_REPO, RESERVATION_REPO} from './infrastruture/tokens';
import {CheckAvailability} from './application/check-availability.use-case';
import {ReservationsController} from './presentation/reservations.controller';
import {CheckIn} from './application/check-in.use-case';
import {UsersModule} from '../users/users.module';
import {DeleteReservationUseCase} from './application/delete-reservation.use-case';
import {UpdateReservationUseCase} from './application/update-reservation.use-case';
import {GetAllReservationsUseCase} from './application/get-all-reservations.use-case';
import {CreateReservationUseCase} from './application/create-reservation.use-case';
import {DashboardController} from './presentation/dashboard.controller';
import {GetDashboardStatsUseCase} from './application/get-dashboard-stats.use-case';
import {GetAvailableSpotsUseCase} from './application/get-available-spots.use-case';
import {GetUsersReservationsHistoryUseCase} from './application/get-user-reservations-history.use-case';
import {UpdateAvailibilityUseCase} from "./application/update-availibility.use-case";
import {GetAllSpotsUseCase} from "./application/get-all-spots.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpot, Reservation]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ParkingSpotsController, ReservationsController,DashboardController],
  providers: [
    ParkingSpotRepo,
    ReservationRepo,
    { provide: PARKING_SPOT_REPO, useExisting: ParkingSpotRepo },
    { provide: RESERVATION_REPO, useExisting: ReservationRepo },
    

    /* Application-layer use-case */
    CheckAvailability,
    GetAllSpotsUseCase,
    UpdateAvailibilityUseCase,
    CreateReservationUseCase,
    GetAllReservationsUseCase,
    UpdateReservationUseCase,
    DeleteReservationUseCase,
    CheckIn,
    GetDashboardStatsUseCase,
    GetAvailableSpotsUseCase,
    GetUsersReservationsHistoryUseCase
  ],
  exports: [TypeOrmModule],
})
export class ParkingModule {
}
