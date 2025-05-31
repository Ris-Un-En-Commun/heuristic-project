import { Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/ports/IReservationRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "src/parking/domain/model/reservation.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReservationRepo implements IReservationRepository {
    constructor(
        @InjectRepository(Reservation) private repo: Repository<Reservation>,
    ) {
    }
    async countAll(): Promise<number> {
    return this.repo.count();
  }

    async countForDate(date: string, spotIds: string[]): Promise<number> {
        const now = new Date();
        const isToday = date === now.toISOString().slice(0, 10);
        const isAfter11AM = now.getHours() >= 11;

        const query = this.repo
            .createQueryBuilder('r')
            .where('r.date = :date', { date })
            .andWhere('r.parkingSpotId IN (:...spotIds)', { spotIds });

        if (isToday && isAfter11AM) {
            query.andWhere('r.checkedIn = true');
        }

    return await query.getCount();
}




    async countByDate(date: string): Promise<number> {
    return this.repo.count({ where: { date } });
  }


  async countCheckedInByDate(date: string): Promise<number> {
    return this.repo.count({ where: { date, checkedIn: true } });
  }



  async countReservationsBetweenDates(startDate: string, endDate: string): Promise<number> {
    return this.repo
      .createQueryBuilder('r')
      .where('r.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getCount();
  }
  
  
  async countNoShowBetweenDates(startDate: string, endDate: string): Promise<number> {
    return this.repo
      .createQueryBuilder('r')
      .where('r.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .andWhere('r.checkedIn = false')
      .getCount();
  }

  async countUniqueUsersBetweenDates(startDate: string, endDate: string): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('r')
      .select('COUNT(DISTINCT r.userId)', 'count')
      .where('r.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getRawOne();

    return parseInt(result.count, 10);
  }
async countCheckedInBetweenDates(startDate: string, endDate: string): Promise<number> {
  return this.repo
    .createQueryBuilder('r')
    .where('r.date BETWEEN :startDate AND :endDate', { startDate, endDate })
    .andWhere('r.checkedIn = true')
    .getCount();
}


    async getUncheckedReservationOn(userId: string, date: Date): Promise<Reservation|null> {
        return await this.repo.findOne({
                where: {
                    user: {id: userId},
                    date: date.toISOString().slice(0, 10),     // e.g. '2024-06-01'
                    checkedIn: false,
                },
                relations: ['parkingSpot'],
            }
        );
    }
}