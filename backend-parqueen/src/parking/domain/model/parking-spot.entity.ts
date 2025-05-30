import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../../../reservations/entities/reservation.entity';

@Entity()
export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({ default: false })
  isElectric: boolean;

  @Column({ default: false })
  isOccupied: boolean;

  @OneToMany(() => Reservation, reservation => reservation.parkingSpot)
  reservations: Reservation[];
}
