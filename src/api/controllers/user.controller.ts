import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseInterceptors,

} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserSearchUseCase } from 'src/use-case/user/user-find-usecase';
import { UserDTO } from '../dtos/user.dto';
import { UserCreateUseCase } from 'src/use-case/user/user-create-usecase';
import { AuthGuard } from 'src/common/auth/auth.guards';
import { ROLES_KEY, Roles } from 'src/common/auth/role/role.decorator';
import { Role } from 'src/common/auth/role/role.enum';
import { CacheInterceptor } from '@nestjs/cache-manager';


@Controller('users')
@ApiTags('users')
@ApiSecurity('JWT-auth')
export class UserController {
    constructor(
        private readonly userSearchUseCase: UserSearchUseCase,
        private readonly userCreateUseCase: UserCreateUseCase
    ) { }

    @Roles(Role.Admin)
    @Get('search')
    async find(@Request() req) {
        console.log('Buscou no banco ALTERACAO FEITA COM SUCESSO')
        req.user = await this.userSearchUseCase.find()
        return req.user
    }

    @Post('create')
    async create(@Body() user: UserDTO) {
        return await this.userCreateUseCase.create(user);
    }
}



