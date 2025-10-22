import { Body, Controller, Get, Param, Post, Query, Request, UnprocessableEntityException } from "@nestjs/common";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UserPermissionUseCase } from "src/use-case/userPermission/user-permission-usecase";
import { UserPermissionDTO } from "../dtos/userPermission.dto";
import { logger } from "src/common/logger/logger";
import { AuthGuard } from "src/common/auth/auth.guards";
import { Roles } from "src/common/auth/role/role.decorator";
import { Role } from "src/common/auth/role/role.enum";

@Controller('userPermission')
@ApiTags('userPermission')

export class UserPermissionController {
    constructor(private readonly userPermissionUseCase: UserPermissionUseCase) { }



    @Post('create')
    async createPermission(
        @Query('user') userId: string, @Query('roles') role: string,
        @Body() userPermission: UserPermissionDTO, @Request() req) {
        req.user = await this.userPermissionUseCase.createPermission(userId, role, userPermission)
        return req.user
    }
}
