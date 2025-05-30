import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({ default: false })
  isElectric: boolean;

  @OneToMany(() => Reservation, reservation => reservation.parkingSpot)
  reservations: Reservation[];
}
