import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,) {
    }

    async create(createUserDto: any | any[]): Promise<User | User[]> {
        const users = this.userRepository.create(createUserDto);
        return this.userRepository.save(users);
    }

    async findOneBy(
        options: Partial<User>,
    ): Promise<User | null> {
        return this.userRepository.findOneBy(options);
    }

}
