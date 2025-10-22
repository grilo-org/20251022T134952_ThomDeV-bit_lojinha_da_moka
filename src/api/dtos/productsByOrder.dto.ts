import { OrdersDto } from "./orders.dto";
import { ProductDTO } from "./product.dto";

export class ProductsByOrderDTO {
    id: string;

    quantidade: number;

    precoVenda: number;

    created_at: Date;

    updated_at: Date;

    order: OrdersDto

    products: ProductDTO
}
