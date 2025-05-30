import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingSpot } from '../../parking/domain/model/parking-spot.entity';
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
  date: string; 

  @Column({ default: false })
  checkedIn: boolean;
}
