import {InjectRepository} from "@nestjs/typeorm";
import {IParkingSpotRepository} from "../domain/ports/IParkingSpotRepository";
import {Repository} from "typeorm";
import {ParkingSpot} from "../domain/model/parking-spot.entity";
import {Injectable, NotFoundException} from "@nestjs/common";
import {format} from "date-fns";

@Injectable()
export class ParkingSpotRepo implements IParkingSpotRepository {
    constructor(
        @InjectRepository(ParkingSpot)
        private readonly repo: Repository<ParkingSpot>,
    ) {
    }

    getAll(): Promise<ParkingSpot[]> {
        return this.repo.find({order: {label: 'ASC'}});
    }

    async findById(spotId: string): Promise<ParkingSpot | null> {
        return await this.repo.findOne({where: {id: spotId}});
    }

    async updateAvailability(spotId: string, isAvailable: boolean): Promise<void> {
        console.log(spotId);
        const parkingSpot = await this.findById(spotId);
        if (!parkingSpot) {
            throw new NotFoundException(`Parking spot with ID ${spotId} not found.`);
        }
        parkingSpot.isAvailable = isAvailable;
        await this.repo.save(parkingSpot);
    }

    findAllAvailable(isElectric = false) {
        return this.repo.find({where: {isElectric, isAvailable: true}});
    }

    async countAll(): Promise<number> {
        return this.repo.count();
    }

    async countElectricSpots(): Promise<number> {
        return this.repo.count({where: {isElectric: true}});
    }

    async countOccupiedToday(): Promise<number> {
        const today = format(new Date(), 'yyyy-MM-dd');

        const occupied = await this.repo
            .createQueryBuilder('spot')
            .leftJoin('spot.reservations', 'reservation')
            .where('reservation.date = :today', {today})
            .andWhere('reservation.checkedIn = true')
            .getCount();

        return occupied;
    }

    async countAvailableToday(isElectric: boolean): Promise<number> {
        const today = format(new Date(), 'yyyy-MM-dd');

        const spots = await this.repo.find({
            where: isElectric ? {isElectric: true} : {},
            relations: ['reservations'],
        });

        let available = 0;

        for (const spot of spots) {
            const todaysReservations = spot.reservations.filter(r => r.date === today);

            const hasCheckedIn = todaysReservations.some(r => r.checkedIn);
            const isEmpty = todaysReservations.length === 0;

            if (isEmpty || !hasCheckedIn) {
                available++;
            }
        }

        return available;
    }
}
