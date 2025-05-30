import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {UsersService} from 'src/users/users.service';
import {UserRole} from "../enums/UserRole.enum";
import {User} from "../../users/entities/user.entity";
import {Request} from 'express';

export interface RequestWithUser extends Request {
    user: User;
}

@Injectable()
export class RoleUserInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) {
    }

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();

        const rawHeader = request.headers['authorization'] as string | undefined;
        if (!rawHeader) {
            throw new UnauthorizedException(
                'Header Authorization manquant (user, admin ou manager)',
            );
        }

        const role = rawHeader.toLowerCase().trim() as UserRole;

        if (!Object.values(UserRole).includes(role)) {
            throw new UnauthorizedException(`Rôle invalide : ${role}`);
        }

        const user = await this.getUserByRole(role);
        if (!user) {
            throw new NotFoundException(
                `Aucun utilisateur avec le rôle ${role} trouvé en base`,
            );
        }

        request.user = user;
        return next.handle();
    }

    private async getUserByRole(role: UserRole): Promise<User | null> {
        switch (role) {
            case UserRole.USER:
                return await this.usersService.findOneBy({name: 'David Dupuis'});
            case UserRole.ADMIN:
                return this.usersService.findOneBy({name: 'Karim Bensalem'});
            case UserRole.MANAGER:
                return this.usersService.findOneBy({name: 'Laura Michel'});
            default:
                throw new UnauthorizedException(`Rôle invalide : ${role}`);
        }
    }
}

