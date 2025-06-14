import {Controller, Post, Body, Get, Req, NotFoundException, UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {Reservation} from "../parking/domain/model/reservation.entity";
import {GetReservationForCheckInUseCase} from "../parking/application/get-reservation-for-check-in-use-case";
import {RoleUserInterceptor} from "../common/interceptors/role-user.interceptor";
import {GetAllReservationsUseCase} from "../parking/application/get-all-reservations.use-case";

@Controller('users')
@UseInterceptors(RoleUserInterceptor)
export class UsersController {

  constructor(
      private readonly usersService: UsersService,
      private readonly checkInUseCase: GetReservationForCheckInUseCase,
      private readonly allReservationsUseCase: GetAllReservationsUseCase,
  ) {}

  @Get('Test')
    ping() {
        return { message: 'hello!' };
    } 

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/current-unchecked-reservation')
  async getCurrentUncheckedReservation(@Req() request: Request): Promise<Reservation> {
    const reservation  = await this.checkInUseCase.execute(request['user']?.id);

    if (!reservation) {
      throw new NotFoundException('Pas de reservation pour aujourd\'hui');
    }

    return reservation;
  }

  @Get('/reservations')
  async getAllReservations(@Req() request: Request): Promise<Reservation[]> {
    if (! request['user']?.id) {
      return [];
    }

    return this.allReservationsUseCase
        .execute(request['user']?.id);
  }
}
