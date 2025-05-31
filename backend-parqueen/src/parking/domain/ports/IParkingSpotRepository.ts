
import { ParkingSpot } from "../model/parking-spot.entity";

export interface IParkingSpotRepository {
    findAllAvailable(isElectric?: boolean): Promise<ParkingSpot[]>;
    findById(spotId: string): Promise<ParkingSpot | null>;
    updateAvailability(spotId: string, isAvailable: boolean): Promise<void>;
    countAll(): Promise<number>;
    countElectricSpots(): Promise<number>;
    countOccupiedToday(): Promise<number>;
}