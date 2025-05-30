import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { CreateReservationDto } from '../application/dto/create-reservation.dto';
import { Reservation } from '../domain/model/reservation.entity';
import { RequestWithUser, RoleUserInterceptor } from 'src/common/interceptors/role-user.interceptor';
import { UpdateReservationDto } from '../application/dto/update-reservation.dto';
import { CheckIn } from '../application/check-in.use-case';
import { CreateReservationUseCase } from '../application/create-reservation.use-case';
import { GetAllReservationsUseCase } from '../application/get-all-reservations.use-case';
import { UpdateReservationUseCase } from '../application/update-reservation.use-case';
import { DeleteReservationUseCase } from '../application/delete-reservation.use-case';

@Controller('reservations')
@UseInterceptors(RoleUserInterceptor)
export class ReservationsController {
  constructor(
    private readonly createReservationUseCase: CreateReservationUseCase,
    private readonly getAllReservationsUseCase: GetAllReservationsUseCase,
    private readonly updateReservationUseCase: UpdateReservationUseCase,
    private readonly deleteReservationUseCase: DeleteReservationUseCase,
    private readonly checkInUseCase: CheckIn,
  ) {
  }

  @Get()
  async findAll() {
    return this.getAllReservationsUseCase.execute();
  }

  @Post()
  async create(@Req() request: RequestWithUser, @Body() createReservationDto: CreateReservationDto): Promise<Reservation | Reservation[]> {
    return this.createReservationUseCase.execute(createReservationDto, request.user.id);

  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    return this.updateReservationUseCase.execute(id, updateReservationDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteReservationUseCase.execute(id);
  }

  @Patch(':id/check-in')
  async checkIn(@Param('id') id: string): Promise<{ message: string; reservation: Reservation }> {
    return this.checkInUseCase.execute(id);
  }
}

