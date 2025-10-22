import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, Timestamp } from "typeorm";
import { ProductEntity } from "./product.entity";
import { OrderstEntity } from "./orders.entity";


@Entity({ name: 'products_by_order' })

export class ProductsByOrderEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    quantidade: number;

    @Column()
    precoVenda: number;

    @CreateDateColumn()
    created_at: Timestamp;

    @CreateDateColumn()
    updated_at: Timestamp;

    @ManyToOne(() => OrderstEntity, (order) => order.productsByOrder, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    order: OrderstEntity

    @ManyToOne(() => ProductEntity, (product) => product.productsByOrder,{
        cascade : ['update']
    })
    products: ProductEntity;
}
