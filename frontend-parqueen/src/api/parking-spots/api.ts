import type {DateRange} from "react-day-picker";
import axios from "axios";

export function isAParkingSpotAvailable(range: DateRange, isElectric: boolean) {
    return axios.get('/parking-spots', {
        params: {startDate: range.from!.toISOString(), endDate: range.to!.toISOString(), isElectric: isElectric}
    })
}
