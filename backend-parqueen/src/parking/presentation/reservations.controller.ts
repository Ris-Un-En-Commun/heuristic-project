import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { ReservationsService } from '../reservations/services/reservations.service';
import { CreateReservationDto } from '../application/dto/create-reservation.dto';
import { Reservation } from '../domain/model/reservation.entity';
import { RequestWithUser, RoleUserInterceptor } from 'src/common/interceptors/role-user.interceptor';
import { UpdateReservationDto } from '../application/dto/update-reservation.dto';
import { CheckIn } from '../application/check-in.use-case';

@Controller('reservations')
@UseInterceptors(RoleUserInterceptor)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService,
              private readonly checkInUseCase: CheckIn,
  ) {
  }

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Post()
  async create(@Req() request: RequestWithUser, @Body() createReservationDto: CreateReservationDto): Promise<Reservation | Reservation[]> {
    return this.reservationsService.create(createReservationDto, request.user.id);

  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.reservationsService.remove(id);
  }

  @Patch(':id/check-in')
  async checkIn(@Param('id') id: string): Promise<{ message: string; reservation: Reservation }> {
    return this.checkInUseCase.execute(id);
  }
}

