import { UserDTO } from "./user.dto";
import { ProductsByOrderDTO } from "./productsByOrder.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrdersDto {
    @ApiProperty({ name: 'id' })
    id: string;
    
    @ApiProperty({ name: 'totalPrice' })
    totalPrice: number;

    @ApiProperty({ name: 'status' })
    status: string;

    @ApiProperty({ name: 'created_at' })
    created_at: Date

    @ApiProperty({ name: 'updated_at' })
    updated_at: Date;

    @ApiProperty({ name: 'user' })
    user: UserDTO;

    @ApiProperty({ name: 'productsByOrder' })
    productsByOrder: ProductsByOrderDTO[];
}
