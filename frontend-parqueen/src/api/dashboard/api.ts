import axios from "axios";
import type {GetDashboardStatsDto} from "./dto/get-dashboard-stats.dto.ts";

export async function getDashboardStats(startDate: string, endDate: string) {
    return axios.get<GetDashboardStatsDto>("/dashboard/stats", {
        params: {startDate, endDate},
    });
}