import { Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { User } from '../users/entities/user.entity';
import { ParkingSpot } from '../parking-spots/entities/parking-spot.entity';  
@Injectable()
export class ReservationsService {


  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ParkingSpot)
    private parkingSpotRepository: Repository<ParkingSpot>,
  ) {}




  async findAll(): Promise<Reservation[]> {
    return this.reservationRepo.find();
  }


  async create(dto: CreateReservationDto): Promise<Reservation> {

    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException(`user avec id ${dto.userId} non trouve`);
    }

    const parkingSpot = await this.parkingSpotRepository.findOne({ where: { id: dto.parkingSpotId } });
    if (!parkingSpot) {
      throw new NotFoundException(`place de parking avec id ${dto.parkingSpotId} non trouvee`);
    }

    const reservation = this.reservationRepo.create({
      user,
      parkingSpot,
      startDate: dto.startDate,
      endDate: dto.endDate,
      checkedIn: false, 
    });

    return this.reservationRepo.save(reservation);
  }



async update(id: string, dto: UpdateReservationDto): Promise<Reservation> {
  
  const reservation = await this.reservationRepo.findOne({ where: { id } });
  if (!reservation) {
    throw new NotFoundException(`Reservation with id ${id} not found`);
  }

  if (dto.userId) {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException(`user avec id ${dto.userId} non trouve`);
    }
    reservation.user = user;
  }

  if (dto.parkingSpotId) {
    const parkingSpot = await this.parkingSpotRepository.findOne({ where: { id: dto.parkingSpotId } });
    if (!parkingSpot) {
      throw new NotFoundException(`place de parking avec id ${dto.parkingSpotId} non trouvee`);
    }
    reservation.parkingSpot = parkingSpot;
  }

  if (dto.startDate) {
    reservation.startDate = dto.startDate;
  }
  if (dto.endDate) {
    reservation.endDate = dto.endDate;
  }

  return this.reservationRepo.save(reservation);
}

  async remove(id: string): Promise<void> {
    await this.reservationRepo.delete(id);
  }





}
