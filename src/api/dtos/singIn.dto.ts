import { ApiProperty } from "@nestjs/swagger";
import { UserDTO } from "./user.dto";
import { Expose } from "class-transformer";

export enum GRANT_TYPE {
    LOGIN = 'login',
    REFRESH_TOKEN = 'refresh_token'
}

export class SingInDTO {
    @ApiProperty({ name: 'email', required: true })
    @Expose({ name: 'email' })
    email: string;

    @ApiProperty({ name: 'password', required: false })
    @Expose({ name: 'password' })
    password: string


    @ApiProperty({ name: 'grant_type', required: false })
    @Expose({ name: 'grant_type' })
    grant_type: GRANT_TYPE

    @ApiProperty({ name: 'refresh_token', required: false })
    @Expose({ name: 'refresh_token' })
    refresh_token: string
}
