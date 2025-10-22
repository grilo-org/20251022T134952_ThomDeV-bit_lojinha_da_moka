import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { Blob } from "buffer";


@Entity({ name: 'products_images' })

export class ProductImagesEntity {
    @PrimaryColumn({ name: 'id' })
    id: string

    @Column({ name: 'image', type: 'blob', nullable: true })
    image: Blob | any

    @ManyToOne(() => ProductEntity, (product) => product.image)
    product: ProductEntity
}
