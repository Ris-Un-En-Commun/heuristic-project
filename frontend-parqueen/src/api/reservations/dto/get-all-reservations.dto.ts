export interface GetAllReservationsDto {
    reservations: Reservation[];
}

export interface Reservation {
    id: string;
    user: {
        id: string;
        name: string;
        role: string;
    };
    parkingSpot: {
        id: string;
        label: string;
        isElectric: boolean;
    };
    date: string;
    checkedIn: boolean;
}