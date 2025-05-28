import { UserRole } from '../../common/enums/UserRole.enum';
import { IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';


export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}