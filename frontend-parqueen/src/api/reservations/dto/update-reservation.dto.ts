import type {CreateReservationDto} from "./create-reservation.dto.ts";

export interface UpdateReservationDto extends Partial<CreateReservationDto> {
}
