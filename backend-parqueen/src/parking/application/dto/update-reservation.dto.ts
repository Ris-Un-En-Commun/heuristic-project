import { IsOptional, IsDateString, IsString, IsBoolean } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  parkingSpotId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsBoolean()
  checkedIn?: boolean;
}
