import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../domain/model/reservation.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { User } from '../../users/entities/user.entity';
import { ParkingSpot } from '../domain/model/parking-spot.entity';
import {ReservationRepo} from "../infrastruture/reservation-repo";
import {Inject} from "@nestjs/common/decorators/core";
import {RESERVATION_REPO} from "../infrastruture/tokens";
import {IReservationRepository} from "../domain/ports/IReservationRepository";

@Injectable()
export class GetReservationForCheckInUseCase {
    constructor(
        @Inject(RESERVATION_REPO)
        private readonly reservationRepo: IReservationRepository,
    ) {
    }

    async execute(userId: string): Promise<Reservation|null> {
        return await this.reservationRepo.getUncheckedReservationOn(userId, new Date());
    }
}