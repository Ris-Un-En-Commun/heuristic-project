import {Reservation} from "../model/reservation.entity";

export interface IReservationRepository {
    countAll(): Promise<number>;
    countForDate(date: string, spotIds: string[]): Promise<number>;
    getUncheckedReservationOn(userId: string, date: Date): Promise<Reservation|null>;
    countByDate(date: string): Promise<number>;
    countCheckedInByDate(date: string): Promise<number>;
    countReservationsBetweenDates(startDate: string, endDate: string): Promise<number>;
    countNoShowBetweenDates(startDate: string, endDate: string): Promise<number>;
    countUniqueUsersBetweenDates(startDate: string, endDate: string): Promise<number>;
    countCheckedInBetweenDates(startDate: string, endDate: string): Promise<number>


}