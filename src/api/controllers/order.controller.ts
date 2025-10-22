import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderUsecase } from "src/use-case/order/order-usecase";
import { OrdersDto } from "../dtos/orders.dto";

@Controller('orders')
@ApiTags('order')

export class OrderController {
    constructor(
        private readonly orderUsecase: OrderUsecase
    ) { }

    @Post()
    async creatOrder(@Body() userEmail: string, @Body() order: OrdersDto) {
        return await this.orderUsecase.createOrder(userEmail, order)
    }
}
