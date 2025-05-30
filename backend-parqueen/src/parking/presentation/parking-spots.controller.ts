import {Controller, Get, Query} from '@nestjs/common';
import {CheckAvailability} from "../application/check-availability.use-case";
import {CheckAvailabilityQueryDto} from "../application/dto/check-availabilty-query-dto";

@Controller('parking-spots')
export class ParkingSpotsController {

    constructor(private readonly checkAvailability: CheckAvailability) {
    }

    @Get()
    async getAvailability(
        @Query() query: CheckAvailabilityQueryDto,
    ) {
        const {startDate, endDate, isElectric} = query;
        const available = await this.checkAvailability.execute(
            Boolean(isElectric),
            startDate,
            endDate,
        );
        return {available};
    }
}
