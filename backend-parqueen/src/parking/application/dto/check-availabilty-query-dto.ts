import {IsDateString, IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';

export class CheckAvailabilityQueryDto {
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @IsNotEmpty()
    @Transform(({value}) => value === 'true')
    isElectric: boolean;
}