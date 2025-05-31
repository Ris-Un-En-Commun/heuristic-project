import { Inject, Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/ports/IReservationRepository";
import { IParkingSpotRepository } from "../domain/ports/IParkingSpotRepository";
import { RESERVATION_REPO, PARKING_SPOT_REPO } from "../infrastruture/tokens";
import { format } from "date-fns";
import { DashboardStatsDto } from "./dto/dashboard-stats.dto";

@Injectable()
export class GetDashboardStatsUseCase {
  constructor(
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: IReservationRepository,
    @Inject(PARKING_SPOT_REPO)
    private readonly parkingRepo: IParkingSpotRepository,
  ) {}

  async execute(startDate: string, endDate: string): Promise<DashboardStatsDto> {
    const today = format(new Date(), "yyyy-MM-dd");

    const [
      totalReservations,
      todayReservations,
      totalSpots,
      electricSpotsCount,
      uniqueUsers,
      checkedInBetweenDates,
      noShowBetweenDates,
    ] = await Promise.all([
      this.reservationRepo.countReservationsBetweenDates(startDate, endDate),
      this.reservationRepo.countByDate(today),
      this.parkingRepo.countAll(),
      this.parkingRepo.countElectricSpots(),
      this.reservationRepo.countUniqueUsersBetweenDates(startDate, endDate),
      this.reservationRepo.countCheckedInBetweenDates(startDate, endDate),
      this.reservationRepo.countNoShowBetweenDates(startDate, endDate),
    ]);

    const averageOccupancyRate =
      totalReservations > 0
        ? Math.round((checkedInBetweenDates / totalReservations) * 100)
        : 0;

    const unusedReservationRate =
      totalReservations > 0
        ? Math.round((noShowBetweenDates / totalReservations) * 100)
        : 0;

    const electricSpotsRate =
      totalSpots > 0 ? Math.round((electricSpotsCount / totalSpots) * 100) : 0;

    return {
      totalReservations,
      todayReservations,
      totalUsers: uniqueUsers,
      averageOccupancyRate,
      unusedReservationRate,
      electricSpotsRate,
      totalSpots,
    };
  }
}
