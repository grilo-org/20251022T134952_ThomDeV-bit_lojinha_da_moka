import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { RolesEntity } from "./roles.entity";

@Entity({name : 'user_permission'})

export class UserPermissionEntity {
    @PrimaryColumn({name : 'id'})
    id : string

    @ManyToOne(()=> UserEntity,(user)=> user.userPermissions)
    user : UserEntity

    @ManyToOne(()=> RolesEntity, (roles)=> roles.userPermission, {
        cascade : true
    })
    roles : RolesEntity
}
