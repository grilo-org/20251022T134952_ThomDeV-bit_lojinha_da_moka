import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

export class ProductDTO {
    @ApiProperty({ name: 'id' })
    @Expose({ name: 'id' })
    id: string

    @ApiProperty({ name: 'name', required: false })
    @Expose({ name: 'name' })
    name: string

    @ApiProperty({ name: 'price', required: false })
    @Expose({ name: 'price' })
    price: number

    @ApiProperty({ name: 'quantity', required: false })
    @Expose({ name: 'quantity' })
    quantity: number
}
