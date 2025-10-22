import { Type } from "class-transformer"
import { ProductDTO } from "./product.dto"
import { ProductEntity } from "src/database/entities/product.entity"

export class ProductImageDTO {
    id: string

    image: Blob | any

    @Type(() => ProductEntity)
    product: ProductEntity
}
