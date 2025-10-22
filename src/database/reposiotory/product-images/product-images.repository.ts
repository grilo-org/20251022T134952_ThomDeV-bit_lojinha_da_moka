import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductImageDTO } from "src/api/dtos/productstImage.dto";
import { ProductImagesEntity } from "src/database/entities/products-images.entity";
import { Repository } from "typeorm";
import { v4 } from "uuid";

@Injectable()

export class ProductImagesRepository {
    constructor(
        @InjectRepository(ProductImagesEntity)
        private readonly productsImagesRepository: Repository<ProductImagesEntity>
    ) { }

    async createProductImage(image: ProductImageDTO) {
        const result = this.productsImagesRepository.create(image)
        return await this.productsImagesRepository.save(result)
    }
}
