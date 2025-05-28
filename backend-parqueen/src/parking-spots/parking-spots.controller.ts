import { Controller,Get,Post,Body } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto';

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
    
}
