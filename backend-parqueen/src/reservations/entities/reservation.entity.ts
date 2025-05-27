import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingSpot } from '../../parking-spots/entities/parking-spot.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @ManyToOne(() => ParkingSpot, spot => spot.reservations)
  parkingSpot: ParkingSpot;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ default: false })
  checkedIn: boolean;
}
