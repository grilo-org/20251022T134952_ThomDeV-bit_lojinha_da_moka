import { Injectable, Inject, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPermissionEntity } from 'src/database/entities/user-permission.entiry';
import { Repository } from 'typeorm';
import { TYPEORM_TOKENS } from '../tokens';
import { UserRepository } from '../user/user.repository';
import { RolesRepository } from '../roles/roles.repository';
import { v4 } from 'uuid';
import { UserPermissionDTO } from 'src/api/dtos/userPermission.dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class UserPermissionRepository {
    constructor(
        @InjectRepository(UserPermissionEntity)
        private readonly userPermissionRepository: Repository<UserPermissionEntity>,
        @Inject(TYPEORM_TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(TYPEORM_TOKENS.ROLES_REPOSIOTRY)
        private readonly rolesRepository: RolesRepository
    ) { }

    async createUserPermission(userId: string, role: string, userPermission: UserPermissionDTO) {
        const user = await this.userRepository.findOneById(userId);

        const permission = await this.searchRole(user)

        const allRoles = await this.rolesRepository.find()
        if (permission.length >= allRoles.length) throw new ForbiddenException('Esse usuario ja tem todas as permissoes')

        let Isvalid;

        permission.map((roles) => roles.roles.id != role ? Isvalid = true : Isvalid = false);
        if (Isvalid === false) throw new ForbiddenException('Usuario ja contem essa permissão')

        const roles = await this.rolesRepository.findById(role);
        if (user === null || roles === null) {
            throw new BadRequestException('Verifique se o usuario ou a permissao e valida');
        }

        userPermission.id = v4();
        userPermission.user = user;
        userPermission.roles = roles
        const newUserPermission = this.userPermissionRepository.create(userPermission);
        return await this.userPermissionRepository.save(newUserPermission);
    }

    async searchRole(userId: UserEntity | any) {
        return await this.userPermissionRepository.find({
            where: {
                user: userId
            },
            relations: {
                roles: true
            }
        })
    }

}
