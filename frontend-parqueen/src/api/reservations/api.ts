import type {DateRange} from "react-day-picker";
import axios from "axios";

export function bookParkingSpot(range: DateRange, isElectric: boolean) {
    return axios.post('/reservations', {startDate: range.from!.toISOString(), endDate: range.to!.toISOString(), isElectric: isElectric}
    )
}