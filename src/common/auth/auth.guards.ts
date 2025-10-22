import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';;
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from './role/role.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from './role/role.enum';
import { UserDTO } from 'src/api/dtos/user.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { Console } from 'console';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtToken: JwtService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) throw new UnauthorizedException('Usuarios errado')
        try {
            const payload: UserEntity | undefined = await this.jwtToken.verifyAsync(
                token,
            )
            request.user = payload
        } catch (error) {
            throw new UnauthorizedException('usuario sem permissao')
        }
        const validate = requiredRoles.some((roles) => request.user?.role === roles)
        console.log(request.user?.rolek, 'dadasdadadad')
        if (!validate) throw new UnauthorizedException('Usuario nao permissao para acessar essa rota')
        return validate
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined
    }
}
