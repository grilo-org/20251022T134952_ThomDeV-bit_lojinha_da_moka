import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { RolesEntity } from "./roles.entity";
import { UserPermissionEntity } from "./user-permission.entiry";
import { OrderstEntity } from "./orders.entity";

@Entity()

export class UserEntity {
    @PrimaryColumn()
    id: string


    @Column({ name: 'name', length: 100, nullable: false, type: 'varchar' })
    name: string

    @Column({ name: 'email', nullable: false, unique: true })
    email: string

    @Column({ name: 'phone', nullable: false, length: 16, unique: true })
    phone: string

    @Column({ name: 'password', nullable: false })
    password: string

    @OneToMany(()=>UserPermissionEntity, (userPermission)=> userPermission.user,{
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE'
    })
    userPermissions: UserPermissionEntity[]
    
    @OneToMany(() =>  OrderstEntity, (orders) => orders.user)
    order : OrderstEntity[]

}

export interface IUserRepository {
    findAll();
}
