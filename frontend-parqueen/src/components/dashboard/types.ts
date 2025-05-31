export interface DashboardStats {
    totalReservations: number;
    todayReservations: number;
    totalUsers: number;
    averageOccupancyRate: number;
    unusedReservationRate: number;
    electricSpotsRate: number;
    totalSpots: number;
}

export type Period = 'today' | '7days' | '30days' | '1year';

export interface PeriodOption {
    key: Period;
    label: string;
    startDate: string;
    endDate: string;
}
