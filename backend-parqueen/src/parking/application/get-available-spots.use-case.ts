import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core';
import { PARKING_SPOT_REPO, RESERVATION_REPO } from '../infrastruture/tokens';
import { IParkingSpotRepository } from '../domain/ports/IParkingSpotRepository';
import { IReservationRepository } from '../domain/ports/IReservationRepository';

@Injectable()
export class GetAvailableSpotsUseCase {
  constructor(
    @Inject(PARKING_SPOT_REPO)
    private readonly parkingRepo: IParkingSpotRepository,
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: IReservationRepository,
  ) {
  }

  async execute(date: Date) {
    const allSpots = await this.parkingRepo.findAllAvailable();

    const reservedSpots = await this.reservationRepo.findReservedSpotsOnDate(date);

    const reservedIds = new Set(reservedSpots.map((spot) => spot.id));

    return allSpots
      .filter((spot) => !reservedIds.has(spot.id))
      .map((spot) => ({
        id: spot.id,
        label: spot.label,
        isElectric: spot.isElectric,
      }));
  }
}
