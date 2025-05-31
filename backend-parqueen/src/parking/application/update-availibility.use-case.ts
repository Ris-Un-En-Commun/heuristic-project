import {Inject, Injectable} from "@nestjs/common/decorators/core";
import {PARKING_SPOT_REPO} from "../infrastruture/tokens";
import {IParkingSpotRepository} from "../domain/ports/IParkingSpotRepository";
import {NotFoundException} from "@nestjs/common";

@Injectable()
export class UpdateAvailibilityUseCase {
    constructor(
        @Inject(PARKING_SPOT_REPO)
        private readonly parkingRepo: IParkingSpotRepository,
    ) {
    }

    async execute(parkingSpotId: string, isAvailable: boolean) {
        console.log(parkingSpotId);
        const spots = await this.parkingRepo.findById(parkingSpotId);
        if (!spots) {
            throw new NotFoundException(`Parking spot with ID ${parkingSpotId} not found.`);
        }
        await this.parkingRepo.updateAvailability(parkingSpotId, isAvailable);
    }
}