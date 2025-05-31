import {Inject, Injectable} from "@nestjs/common/decorators/core";
import {PARKING_SPOT_REPO} from "../infrastruture/tokens";
import {IParkingSpotRepository} from "../domain/ports/IParkingSpotRepository";

@Injectable()
export class GetAllSpotsUseCase {
    constructor(
        @Inject(PARKING_SPOT_REPO)
        private readonly parkingRepo: IParkingSpotRepository,
    ) {
    }

    async execute() {
        return await this.parkingRepo.getAll();
    }
}