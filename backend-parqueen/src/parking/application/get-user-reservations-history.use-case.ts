import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, Equal, MoreThan } from 'typeorm';
import { Reservation } from '../domain/model/reservation.entity';
import { GetUserReservationsHistoryDto } from './dto/get-user-reservations-history.dto';

@Injectable()
export class GetUsersReservationsHistoryUseCase {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
  ) {}

  async execute(userId: string) {
    const today = new Date().toISOString().split('T')[0]; 

    const [past, todayRes, future] = await Promise.all([
      this.reservationRepo.find({
        where: {
          user: { id: userId },
          date: LessThan(today),
        },
        order: { date: 'DESC' },
        relations: ['parkingSpot'],
      }),



      this.reservationRepo.find({
        where: {
          user: { id: userId },
          date: Equal(today),
        },
        relations: ['parkingSpot'],
      }),


      this.reservationRepo.find({
        where: {
          user: { id: userId },
          date: MoreThan(today),
        },
        order: { date: 'ASC' },
        relations: ['parkingSpot'],
      }),
    ]);



return { past, today: todayRes,future,};
  }
}
