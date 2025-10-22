import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ProductsCategorietEntity } from "./products-categories.entity";
import {  ProductImagesEntity } from "./products-images.entity";
import { ProductsByOrderEntity } from "./productsByOrder.entity";


@Entity({ name: 'products' })

export class ProductEntity {
    @PrimaryColumn({ name: 'id' })
    id: string

    @Column({ name: 'name', nullable: false })
    name: string

    @Column({ name: 'price', type: 'int', nullable: false })
    price: number

    @Column({ name: 'quantity', nullable: false })
    quantity: number


    @OneToMany(()=> ProductsCategorietEntity, (categorie) => categorie.product)
    categorie : ProductsCategorietEntity[]


    @OneToMany(()=> ProductImagesEntity, (image) => image.product)
    image : ProductImagesEntity[]

    @OneToMany(()=> ProductsByOrderEntity,(productsByOrder)=> productsByOrder.products)
    productsByOrder: ProductsByOrderEntity[]
}
