import { ForbiddenException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';

import { TYPEORM_TOKENS } from 'src/database/reposiotory/tokens';
import { UserRepository } from 'src/database/reposiotory/user/user.repository';
import { RolesRepository } from 'src/database/reposiotory/roles/roles.repository';
import { UserDTO } from 'src/api/dtos/user.dto';
import { v4 } from 'uuid';
import { hash } from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from 'src/api/dtos/eventEmiter.dto';


@Injectable()
export class UserCreateUseCase {
    constructor(
        @Inject(TYPEORM_TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,

    ) { }


    async create(user: UserDTO) {
        try {
            user.id = v4()
            user.password = await hash(user.password, 10)
            const users = await this.userRepository.insert(user)
            return users
        } catch (error) {
            if (error?.code?.includes('ER_DUP_ENTRY')) {
                throw new UnprocessableEntityException('Este email ja esta em uso')
            }
            throw new UnprocessableEntityException(error?.data);
        }
    }
}
