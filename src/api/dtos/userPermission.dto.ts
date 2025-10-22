import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { RolesEntity } from "src/database/entities/roles.entity";
import { UserEntity } from "src/database/entities/user.entity";

export class UserPermissionDTO {
    @ApiProperty({ name: 'id' })
    @Expose({ name: 'id' })
    id: string

    @ApiProperty({ name: 'userId' })
    @Expose({ name: 'userId' })
    @Type(() => UserEntity)
    user: UserEntity


    @ApiProperty({ name: 'rolesid' })
    @Expose({ name: 'rolesid' })
    @Type(() => RolesEntity)
    roles: RolesEntity

}
