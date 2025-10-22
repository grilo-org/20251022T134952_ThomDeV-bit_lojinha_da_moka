import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { format } from "path";
import { OrdersDto } from "src/api/dtos/orders.dto";
import { ProductsByOrderDTO } from "src/api/dtos/productsByOrder.dto";
import { StatusPedido } from "src/common/enum/status-pedido.enum";
import { OrdersRepository } from "src/database/reposiotory/orders/orders.repository";
import { ProductRepository } from "src/database/reposiotory/product/product.repository";
import { TYPEORM_TOKENS } from "src/database/reposiotory/tokens";
import { UserRepository } from "src/database/reposiotory/user/user.repository";
import { v4 } from "uuid";

@Injectable()


export class OrderUsecase {
    constructor(
        @Inject(TYPEORM_TOKENS.ORDER_REPOSITORY)
        private readonly orderRepository: OrdersRepository,
        @Inject(TYPEORM_TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(TYPEORM_TOKENS.PRODUCT_REPOSITORY)
        private readonly productsRepository: ProductRepository
    ) { }

    async createOrder(userEmail: string, order: OrdersDto) {
        const user = await this.userRepository.findOneByEmail(userEmail)
        if (!user) {
            throw new NotFoundException('Usuario nao encontrado')
        }
        order.id = v4()
        order.created_at = new Date()
        order.updated_at = new Date()
        order.status = StatusPedido.EM_PROCESSAMENTO

        const producId = order.productsByOrder.map((product) => product.id)

        const productValidate = await this.productsRepository.findById(producId)

        const productsOrders = order.productsByOrder.map((eachProduct) => {
            const productExits = productValidate.find((product) => product.id === eachProduct.id)
            const productsByOrder = new ProductsByOrderDTO()
            productsByOrder.id = v4()
            productsByOrder.products = productExits
            productsByOrder.precoVenda = productExits.price
            productsByOrder.quantidade = eachProduct.quantidade
            productsByOrder.products.quantity -= eachProduct.quantidade
            return productsByOrder
        })

        const totalPrice = productsOrders.reduce((total, products) => {
            return total + products.precoVenda * products.quantidade
        }, 0)

        order.totalPrice = totalPrice
        order.productsByOrder = productsOrders
        const createOrder = await this.orderRepository.createOrder(order)
        return createOrder
    }
}
