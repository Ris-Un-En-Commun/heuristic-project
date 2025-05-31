import type { Reservation } from "../dto/get-all-reservations.dto";
export interface GetUserReservationsHistoryDto {
  past: Reservation[];
  today: Reservation[];
  future: Reservation[];
}