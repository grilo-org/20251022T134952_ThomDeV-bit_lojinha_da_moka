import { Inject, Injectable } from "@nestjs/common";
import { ProductDTO } from "src/api/dtos/product.dto";
import { ProductImageDTO } from "src/api/dtos/productstImage.dto";
import { ProductEntity } from "src/database/entities/product.entity";
import { ProductImagesEntity } from "src/database/entities/products-images.entity";
import { ProductImagesRepository } from "src/database/reposiotory/product-images/product-images.repository";
import { ProductRepository } from "src/database/reposiotory/product/product.repository";
import { TYPEORM_TOKENS } from "src/database/reposiotory/tokens";
import { v4 } from "uuid";

@Injectable()

export class ProductImageUsecase {
    constructor(
        @Inject(TYPEORM_TOKENS.PRODUCTS_IMAGE_REPOSITORY)
        private readonly productImageRepository: ProductImagesRepository,
        @Inject(TYPEORM_TOKENS.PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository
    ) { }

    async createProductImage(product: string, file: Express.Multer.File) {
        const producId = await this.productRepository.findByName(product)
        const create = new ProductImageDTO()
        create.id = v4()
        create.image = file.buffer
        create.product = producId
        const result = await this.productImageRepository.createProductImage(create)
        return result
    }
}
