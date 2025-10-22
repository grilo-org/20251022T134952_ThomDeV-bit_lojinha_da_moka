import { ProductDTO } from "src/api/dtos/product.dto";
import { ProductsCategorietDTO } from "src/api/dtos/productCategorie.dto";

export class ProductCategorie implements ProductsCategorietDTO {
    constructor(
        newCategorie: ProductsCategorietDTO
    ) {
        this.id = newCategorie.id
        this.name = newCategorie.name
        this.product = newCategorie.product
    }
    id: string;
    name: string;
    product: ProductDTO;

}
