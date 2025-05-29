import { Controller,Get, Post, Put, Delete, Patch, Param, Body, HttpCode } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}


    @Get('Test')
        ping() {
        return { message: 'hello!' };
                }
    @Get()
    async findAll() {
        return this.reservationsService.findAll(); 
    }

    @Post()
    async create(@Body() createReservationDto: CreateReservationDto) : Promise <Reservation| Reservation[]> {
        return this.reservationsService.create(createReservationDto); 

    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateReservationDto: CreateReservationDto): Promise<Reservation> {
        return this.reservationsService.update(id, updateReservationDto);
    }

    @Delete(':id')
    @HttpCode(204) 
    async remove(@Param('id') id: string): Promise<void> {
        return this.reservationsService.remove(id);
    }
}

