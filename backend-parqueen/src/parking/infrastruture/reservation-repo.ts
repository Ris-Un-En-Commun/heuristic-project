import {Injectable} from "@nestjs/common/decorators/core";
import {IReservationRepository} from "../domain/ports/IReservationRepository";
import {InjectRepository} from "@nestjs/typeorm/dist/common";
import {Reservation} from "src/parking/domain/model/reservation.entity";
import {Repository} from "typeorm/repository/Repository";

@Injectable()
export class ReservationRepo implements IReservationRepository {
    constructor(
        @InjectRepository(Reservation) private repo: Repository<Reservation>,
    ) {
    }

    async countForDate(date: string, spotIds: string[]): Promise<number> {
        return await this.repo
            .createQueryBuilder('r')
            .where('r.date = :date', {date})
            .andWhere('r.parkingSpotId IN (:...spotIds)', {spotIds})
            .getCount();
    }
}