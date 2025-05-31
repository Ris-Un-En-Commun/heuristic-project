import type {DateRange} from "react-day-picker";
import axios from "axios";
import type {AvailableSpotDto} from "./dto/available-spot.dto.ts";
import type {GetAllParkingSpotsDto} from "../reservations/dto/get-all-parking-spots.dto.ts";

export function isAParkingSpotAvailable(range: DateRange, isElectric: boolean) {
    return axios.get('/parking-spots', {
        params: {startDate: range.from!.toISOString(), endDate: range.to!.toISOString(), isElectric: isElectric}
    })
}

export async function getAvailableSpots(date: string) {
    return axios.get<AvailableSpotDto[]>(`/parking-spots/available`, {
        params: {date},
    });
}

export function getAllParkingSpots() {
    return axios.get<GetAllParkingSpotsDto>("/parking-spots/all");
}

export function changeParkingSpotAvailability(id: string, isAvailable: boolean) {
    return axios.patch(`/parking-spots/${id}`, {isAvailable});
}
