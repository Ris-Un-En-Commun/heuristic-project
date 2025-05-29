import { Controller,Get,Post,Body,Query } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Controller('parking-spots')
export class ParkingSpotsController {

      constructor(private readonly parkingSpotsService: ParkingSpotsService) {}
        @Get('Test')
          ping() {
              return { message: 'hello!' };
          } 
      
        @Post()
        create(@Body() CreateParkingSpotDto: CreateParkingSpotDto) {
          return this.parkingSpotsService.create(CreateParkingSpotDto);
        }

        
        @Get()
        async checkAvailability(
          @Query('startDate') startDate: string,
          @Query('endDate') endDate: string,
          @Query('isElectric') isElectric: string,  
        ): Promise<{ available: boolean }> {

          
          if (!startDate || !endDate) {
            throw new BadRequestException('startDate and endDate are required');
          }

          const electric = isElectric === 'true';

          const available = await this.parkingSpotsService.checkAvailability(
            electric,
            startDate,
            endDate,
          );

          if (!available) {
             throw new NotFoundException('No parking spot available for the given criteria');
          } 

         return { available };return { available };
        }
    
}
