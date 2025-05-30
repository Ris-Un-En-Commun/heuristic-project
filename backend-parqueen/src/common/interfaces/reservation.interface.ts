import { User } from "./user.interface";
import { ParkingSpot } from "./parkingSpot.interface";

export interface Reservation {
    id : number;
    user : User;
    parkingSpot : ParkingSpot;
    startTime : Date;
    endTime : Date;
    checkedIn : boolean;
    createdAt : Date;
    updatedAt : Date;
}