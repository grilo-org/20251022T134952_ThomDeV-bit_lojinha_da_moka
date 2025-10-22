import { ApiProperty } from "@nestjs/swagger"
import { ProductDTO } from "./product.dto"
import { Expose } from "class-transformer"

export class ProductsCategorietDTO {
    id: string

    @ApiProperty({ name: 'name' })
    @Expose({ name: 'name' })
    name: string

    product: ProductDTO
}
