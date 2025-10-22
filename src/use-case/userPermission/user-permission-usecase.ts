import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserPermissionDTO } from 'src/api/dtos/userPermission.dto';
import { logger } from 'src/common/logger/logger';
import { TYPEORM_TOKENS } from 'src/database/reposiotory/tokens';
import { UserPermissionRepository } from 'src/database/reposiotory/userPermission/user-permission.repository';

@Injectable()
export class UserPermissionUseCase {
    constructor(
        @Inject(TYPEORM_TOKENS.USER_PERMISSION_REPOSIOTRY)
        private readonly userPermissionRepository: UserPermissionRepository
    ) { }

    async createPermission(userId: string, role: string, userPermission: UserPermissionDTO) {
        logger.logger.info(UserPermissionUseCase.prototype.createPermission)
        return await this.userPermissionRepository.createUserPermission(userId, role, userPermission);
    }
}
