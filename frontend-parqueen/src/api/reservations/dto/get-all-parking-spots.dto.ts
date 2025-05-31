export interface GetAllParkingSpotsDto {
    reservations: ParkingSpots[];
}

export interface ParkingSpots {
    id: string;
    label: string;
    isElectric: boolean;
    isAvailable: boolean;
}