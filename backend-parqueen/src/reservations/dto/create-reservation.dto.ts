import {IsBoolean, IsDateString, IsNotEmpty} from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @IsNotEmpty()
    @IsBoolean()
    isElectric: boolean;
}
