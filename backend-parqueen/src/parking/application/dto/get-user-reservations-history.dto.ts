import { Reservation } from '../../domain/model/reservation.entity';

export interface GetUserReservationsHistoryDto {
  past: Reservation[];
  today: Reservation[];
  future: Reservation[];
}
