import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NotFoundError } from "rxjs";
import { TYPEORM_TOKENS } from "src/database/reposiotory/tokens";
import { UserRepository } from "src/database/reposiotory/user/user.repository";
import { UserSearchUseCase } from "../user/user-find-usecase";

@Injectable()


export class RefreshTokenUseCase {
    constructor(
        @Inject(TYPEORM_TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly jwtToken: JwtService

    ) { }

    async refreshToken(token: string) {
        const payload = await this.reauthenticate(token)
        return this.jwtToken.sign({payload}, { expiresIn: 3600 * 24 })
    }

    private async reauthenticate(token: string) {
        const userId = this.jwtToken?.decode(token)['id']
        const userExists = await this.userRepository.findOneById(userId)
        if (!userExists) throw new NotFoundException('Usuario nao encontrado')
        try {
            this.jwtToken.verify(token)
            return userExists
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Assinatura Inválida');
            }
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token Expirado');
            }
            throw new UnauthorizedException(error.name);
        }
    }
}

