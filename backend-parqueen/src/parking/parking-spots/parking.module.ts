import {forwardRef, Module} from '@nestjs/common';
import {ParkingSpotsController} from '../presentation/parking-spots.controller';
import {ParkingSpotsService} from './services/parking-spots.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ParkingSpot} from '../domain/model/parking-spot.entity';
import {ReservationsModule} from '../../reservations/reservations.module';
import {Reservation} from '../../reservations/entities/reservation.entity';
import {ParkingSpotRepo} from '../infrastruture/parking-spot-repo.service';
import {ReservationRepo} from "../infrastruture/reservation-repo";
import {PARKING_SPOT_REPO, RESERVATION_REPO} from '../infrastruture/tokens';
import {CheckAvailability} from '../application/check-availability.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([ParkingSpot, Reservation],),
        forwardRef(() => ReservationsModule)
    ],
    controllers: [ParkingSpotsController],
    providers: [ParkingSpotsService,
        ParkingSpotRepo,
        ReservationRepo,
        {provide: PARKING_SPOT_REPO, useExisting: ParkingSpotRepo},
        {provide: RESERVATION_REPO, useExisting: ReservationRepo},

        /* Application-layer use-case */
        CheckAvailability,
    ],
    exports: [ParkingSpotsService, TypeOrmModule],
})
export class ParkingModule {
}
