import {Inject, Injectable} from "@nestjs/common/decorators/core";
import {PARKING_SPOT_REPO, RESERVATION_REPO} from "../infrastruture/tokens";
import {IParkingSpotRepository} from "../domain/ports/IParkingSpotRepository";
import {IReservationRepository} from "../domain/ports/IReservationRepository";
import {ParkingCalendar} from "../domain/service/parking-calendar";

@Injectable()
export class CheckAvailability {
    constructor(
        @Inject(PARKING_SPOT_REPO)
        private readonly parkingRepo: IParkingSpotRepository,
        @Inject(RESERVATION_REPO)
        private readonly reservationRepo: IReservationRepository,
    ) {
    }

    async execute(isElectric: boolean, start: string, end: string): Promise<boolean> {
        const spots = await this.parkingRepo.findAll(isElectric);
        if (spots.length === 0) return false;

        const spotIds = spots.map(s => s.id);
        const dates = ParkingCalendar.workingDaysBetween(new Date(start), new Date(end));

        for (const date of dates) {
            const booked = await this.reservationRepo.countForDate(date, spotIds);
            if (booked >= spots.length) return false;
        }
        return true;
    }
}