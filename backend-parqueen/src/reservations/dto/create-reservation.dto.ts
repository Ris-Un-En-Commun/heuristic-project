import { IsDateString, IsNotEmpty, IsString,IsBoolean } from 'class-validator';
export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

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
