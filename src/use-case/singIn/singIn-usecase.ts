import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SingInDTO } from "src/api/dtos/singIn.dto";
import { UserEntity } from "src/database/entities/user.entity";
import { TYPEORM_TOKENS } from "src/database/reposiotory/tokens";
import { UserRepository } from "src/database/reposiotory/user/user.repository";
import { compare, hash } from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { UserPermissionRepository } from "src/database/reposiotory/userPermission/user-permission.repository";
import { ClientProxy, EventPattern } from "@nestjs/microservices";
import { CreateUserEvent } from "src/api/dtos/eventEmiter.dto";

@Injectable()

export class SingInUseCase {

    constructor(

        @Inject(TYPEORM_TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(TYPEORM_TOKENS.USER_PERMISSION_REPOSIOTRY)
        private readonly userPermissionRepository: UserPermissionRepository,
        private readonly jwtToken: JwtService
    ) { }

    async singIn(userSingIn: SingInDTO) {
        dotenv.config()
        let permission;
        const users: UserEntity = await this.userRepository.findOneByEmail(userSingIn.email)

        const userPermission = await this.userPermissionRepository.searchRole(users)

        const roles = userPermission.filter((role) => role.roles.role === 'admin' || role.roles.role === 'user')
        for (const role in roles) {
            permission = roles[role].roles.role
            switch (permission) {
                case 'admin': permission = roles[role].roles.role
                    break;
                case 'user': permission = roles[role].roles.role
                    break;

                default:
                    break;
            }
        }
        if (!users) throw new UnauthorizedException('Usuario invalido')

        const password = users.password
        console.log(password)
        const passwordValid = await compare(userSingIn?.password, password)

        if (passwordValid === false) throw new UnauthorizedException('Senha invalida')

        const payload = { id: users.id, role: permission }

        return {
            access_token: await this.jwtToken.signAsync(payload),
            refresh_token: await this.jwtToken.signAsync(payload, { expiresIn: 3600 * 24 }),
            token_type: "Bearer",
            expires_in: 3600
        }
    }
}
