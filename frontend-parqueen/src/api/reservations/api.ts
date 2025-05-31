import type {DateRange} from "react-day-picker";
import axios from "axios";
import type {GetCurrentUncheckedReservationDto} from "./dto/get-current-unchecked-reservation.dto.ts";
import type {GetAllReservationsDto} from "./dto/get-all-reservations.dto.ts";

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

export function getAllReservations() {
    return axios.get<GetAllReservationsDto>("/reservations");
}

export async function deleteReservation(id: string) {
    return axios.delete(`/reservations/${id}`);
}
