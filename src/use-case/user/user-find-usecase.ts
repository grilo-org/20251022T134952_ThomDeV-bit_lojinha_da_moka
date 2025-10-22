import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserEvent } from "src/api/dtos/eventEmiter.dto";
import { TYPEORM_TOKENS } from "src/database/reposiotory/tokens";
import { UserRepository } from "src/database/reposiotory/user/user.repository";

@Injectable()
export class UserSearchUseCase {
    constructor(
        @Inject(TYPEORM_TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async find() {
        try {
            const users = await this.userRepository.findAll()
            await this.cacheManager.set('02020', 'teste')
            return users
        } catch (error) {
            throw new NotFoundException()
        }
    }
}
