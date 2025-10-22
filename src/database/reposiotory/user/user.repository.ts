import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingInDTO } from 'src/api/dtos/singIn.dto';
import { UserDTO } from 'src/api/dtos/user.dto';
import { IUserRepository, UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            relations: {
                userPermissions: {
                    roles: true,
                }
            }
        });
    }
    async find(user: string) {
        return await this.userRepository.findOne({
            where: {
                id: user
            }
        })
    }
    async insert(user: UserDTO): Promise<UserEntity> {
        const users = this.userRepository.create(user);
        return await this.userRepository.save(users);
    }

    async findOneById(user: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: {
                id: user
            },
            relations: {
                userPermissions: true
            }
        })
    }

    async findOneByEmail(userEmail: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: {
                email: userEmail
            },
            relations: {
                userPermissions: true
            }
        })
    }
}

