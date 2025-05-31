import {IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';

export class UpdateAvailabilityDto {
    @IsNotEmpty()
    @Transform(({value}) => value === 'true')
    isAvailable: boolean;
}