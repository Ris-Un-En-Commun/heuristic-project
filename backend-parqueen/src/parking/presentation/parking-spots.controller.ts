import { Controller, Get, Query } from '@nestjs/common';
import { CheckAvailability } from '../application/check-availability.use-case';
import { CheckAvailabilityQueryDto } from '../application/dto/check-availabilty-query-dto';
import { GetAvailableSpotsUseCase } from '../application/get-available-spots.use-case';

@Controller('parking-spots')
export class ParkingSpotsController {

    constructor(
      private readonly checkAvailability: CheckAvailability,
      private readonly getAvailableSpotsUseCase: GetAvailableSpotsUseCase,
    ) {
    }

    @Get()
    async getAvailability(
      @Query() query: CheckAvailabilityQueryDto,
    ) {
        const { startDate, endDate, isElectric } = query;
        const available = await this.checkAvailability.execute(
          Boolean(isElectric),
          startDate,
          endDate,
        );
        return { available };
    }

    @Get('available')
    async getAvailableSpots(@Query('date') dateString: string) {
        if (!dateString) {
            throw new Error('Date requise');
        }

        const date = new Date(dateString);
        return await this.getAvailableSpotsUseCase.execute(date);
    }
}
