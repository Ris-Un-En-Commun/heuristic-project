import { UserRole } from '../enums/UserRole.enum';

export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
}