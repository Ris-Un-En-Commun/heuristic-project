import { UserRole } from '../../common/enums/UserRole.enum';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
