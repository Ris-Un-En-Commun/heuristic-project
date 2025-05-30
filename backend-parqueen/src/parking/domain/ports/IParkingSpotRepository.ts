import {ParkingSpot} from "../model/parking-spot.entity";

export interface IParkingSpotRepository {
    findAll(isElectric?: boolean): Promise<ParkingSpot[]>;
}