import {Reservation} from "../model/reservation.entity";

export interface IReservationRepository {
    countForDate(date: string, spotIds: string[]): Promise<number>;
    getUncheckedReservationOn(userId: string, date: Date): Promise<Reservation|null>;
}