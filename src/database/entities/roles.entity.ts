import { Role } from "../../common/auth/role/role.enum";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserPermissionEntity } from "./user-permission.entiry";


@Entity({name : 'roles'})

export class RolesEntity {
    @PrimaryColumn({name: 'id'})
    id : string

    @Column({name: 'role',type :'enum' ,enum : Role, nullable: false})
    role : string

    @OneToMany(()=>UserPermissionEntity, (permission)=>permission.roles)
    userPermission : UserPermissionEntity[]
}
export interface IRolesRepository {
    findById(roles : string): Promise<RolesEntity>;
}
