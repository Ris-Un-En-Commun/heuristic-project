import { Module } from '@nestjs/common';
import { ParkingSpotsController } from './presentation/parking-spots.controller';
import { ParkingSpotsService } from './parking-spots/services/parking-spots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from './domain/model/parking-spot.entity';
import { Reservation } from './domain/model/reservation.entity';
import { ParkingSpotRepo } from './infrastruture/parking-spot-repo.service';
import { ReservationRepo } from './infrastruture/reservation-repo';
import { PARKING_SPOT_REPO, RESERVATION_REPO } from './infrastruture/tokens';
import { CheckAvailability } from './application/check-availability.use-case';
import { ReservationsController } from './presentation/reservations.controller';
import { ReservationsService } from './reservations/services/reservations.service';
import { CheckIn } from './application/check-in.use-case';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpot, Reservation, User]),
    UsersModule,
  ],
  controllers: [ParkingSpotsController, ReservationsController],
  providers: [ParkingSpotsService, ReservationsService,
    ParkingSpotRepo,
    ReservationRepo,
    { provide: PARKING_SPOT_REPO, useExisting: ParkingSpotRepo },
    { provide: RESERVATION_REPO, useExisting: ReservationRepo },

    /* Application-layer use-case */
    CheckAvailability, CheckIn,
  ],
  exports: [ParkingSpotsService, ReservationsService, TypeOrmModule],
})
export class ParkingModule {
}
