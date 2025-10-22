import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { ProductEntity } from "./product.entity";


@Entity({ name: 'products_categorie' })

export class ProductsCategorietEntity {
    @PrimaryColumn({ name: 'id' })
    id: string

    @Column({name : 'name'})
    name: string

    @ManyToOne(()=> ProductEntity, (product)=> product.categorie)
    product : ProductEntity
}
