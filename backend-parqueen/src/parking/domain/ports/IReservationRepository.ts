export interface IReservationRepository {
    countForDate(date: string, spotIds: string[]): Promise<number>;
}