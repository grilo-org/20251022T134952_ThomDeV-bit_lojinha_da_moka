import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, Timestamp } from "typeorm";
import { UserEntity } from "./user.entity";
import { ProductsByOrderEntity } from "./productsByOrder.entity";
import { StatusPedido } from "../../common/enum/status-pedido.enum";


@Entity({ name: 'orders' })

export class OrderstEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ name: 'valor_total', nullable: false })
    totalPrice: number;

    @Column({ name: 'status', type: 'enum', enum: StatusPedido, nullable: false })
    status: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @CreateDateColumn()
    updated_at: Timestamp;

    @ManyToOne(() => UserEntity, (user) => user.order)
    user: UserEntity;

    @OneToMany(() => ProductsByOrderEntity, (products) => products.order, {
        cascade: true,
    })
    productsByOrder: ProductsByOrderEntity[];
}
