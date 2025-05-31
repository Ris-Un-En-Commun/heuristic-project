interface ParkingSpot {
    id: string;
    label: string;
    isElectric: boolean;
}

export interface GetCurrentUncheckedReservationDto {
    id: string;
    date: string;
    checkedIn: boolean;
    parkingSpot: ParkingSpot;
}
