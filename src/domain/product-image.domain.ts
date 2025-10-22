import { ProductImageDTO } from "src/api/dtos/productstImage.dto";
import { ProductEntity } from "src/database/entities/product.entity";

export class ProductImage implements ProductImageDTO {
    constructor(newImage: ProductImageDTO) {
        this.id = newImage.id
        this.image = newImage.image
        this.product = newImage.product
    }
    id: string;
    image: any;
    product: ProductEntity;

}
