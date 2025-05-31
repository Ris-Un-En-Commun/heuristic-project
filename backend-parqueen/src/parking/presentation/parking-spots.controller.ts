import {Body, Controller, Get, Param, Patch, Query} from '@nestjs/common';
import {CheckAvailability} from '../application/check-availability.use-case';
import {CheckAvailabilityQueryDto} from '../application/dto/check-availabilty-query-dto';
import {GetAvailableSpotsUseCase} from '../application/get-available-spots.use-case';
import {UpdateAvailabilityDto} from "../application/dto/update-availabilty-dto";
import {UpdateAvailibilityUseCase} from "../application/update-availibility.use-case";
import {GetAllSpotsUseCase} from "../application/get-all-spots.use-case";

@Controller('parking-spots')
export class ParkingSpotsController {

    constructor(
        private readonly checkAvailability: CheckAvailability,
        private readonly getAvailableSpotsUseCase: GetAvailableSpotsUseCase,
        private readonly updateAvailabilityUseCase: UpdateAvailibilityUseCase,
        private readonly getAllParkingSpotsUseCase: GetAllSpotsUseCase,
    ) {
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

    @Get('available')
    async getAvailableSpots(@Query('date') dateString: string) {
        if (!dateString) {
            throw new Error('Date requise');
        }

        const date = new Date(dateString);
        return await this.getAvailableSpotsUseCase.execute(date);
    }

    @Patch(':id')
    async updateParkingSpot(@Body() body: UpdateAvailabilityDto, @Param('id') id:string) {
        const {isAvailable} = body;
        return await this.updateAvailabilityUseCase.execute(id, isAvailable);
    }

    @Get('all')
    async getAllParkingSpots() {
        return await this.getAllParkingSpotsUseCase.execute();
    }
}
