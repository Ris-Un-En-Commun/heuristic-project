import type {DateRange} from "react-day-picker";
import axios from "axios";
import type {GetCurrentUncheckedReservationDto} from "./dto/get-current-unchecked-reservation.dto.ts";

export function bookParkingSpot(range: DateRange, isElectric: boolean) {
    return axios.post('/reservations', {startDate: range.from!.toISOString(), endDate: range.to!.toISOString(), isElectric: isElectric}
    )
}

export async function fetchCurrentUncheckedReservation() {
    return await axios.get<GetCurrentUncheckedReservationDto|null>('/users/current-unchecked-reservation');
}

export async function checkIn(id: string) {
    return axios.patch(`/reservations/${id}/check-in`);
}