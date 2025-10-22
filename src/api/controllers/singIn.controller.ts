import { Body, Controller, Header, Headers, Post, Query, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { SingInUseCase } from "src/use-case/singIn/singIn-usecase";
import { GRANT_TYPE, SingInDTO } from "../dtos/singIn.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/common/auth/auth.guards";
import { RefreshTokenUseCase } from "src/use-case/singIn/refresh-token-usecase";
import { throwIfEmpty } from "rxjs";

@Controller('singIn')
@ApiTags('singIn')

export class SignInController {
    constructor(
        private readonly singInUseCase: SingInUseCase,
        private readonly refreTokenUseCase: RefreshTokenUseCase
    ) { }

    @Post('singIn')
    async singIn(@Body() user: SingInDTO, @Request() req) {
        req.user = await this.singInUseCase.singIn(user)
        return req.user

    }
}
