import {InjectRepository} from "@nestjs/typeorm/dist/common";
import {IParkingSpotRepository} from "../domain/ports/IParkingSpotRepository";
import {Repository} from "typeorm/repository/Repository";
import {ParkingSpot} from "../domain/model/parking-spot.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ParkingSpotRepo implements IParkingSpotRepository {
    constructor(
        @InjectRepository(ParkingSpot)
        private readonly repo: Repository<ParkingSpot>,
    ) {
    }

    findAll(isElectric = false) {
        return this.repo.find({where: isElectric ? {isElectric: true} : {}});
    }
}