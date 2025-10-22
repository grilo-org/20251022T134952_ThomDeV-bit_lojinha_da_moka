import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersDto } from "src/api/dtos/orders.dto";
import { OrderstEntity } from "src/database/entities/orders.entity";
import { Repository } from "typeorm";

@Injectable()

export class OrdersRepository {
    constructor(
        @InjectRepository(OrderstEntity)
        private readonly ordersRepository : Repository<OrderstEntity>
    ){}

    async createOrder(order : OrdersDto){
        const createOrder =  this.ordersRepository.create(order)
        return await this.ordersRepository.save(createOrder)
    }

    async findOrder(){
        const orders = await this.ordersRepository.find({
            relations : {
                user : true
            }
        })
    }
}