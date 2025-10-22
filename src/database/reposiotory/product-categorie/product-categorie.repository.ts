import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDTO } from "src/api/dtos/product.dto";
import { ProductsCategorietDTO } from "src/api/dtos/productCategorie.dto";
import { ProductEntity } from "src/database/entities/product.entity";
import { ProductsCategorietEntity } from "src/database/entities/products-categories.entity";
import { In, Repository } from "typeorm";

@Injectable()


export class ProductsCategorieRepository {
    constructor(
        @InjectRepository(ProductsCategorietEntity)
        private readonly productRepository: Repository<ProductsCategorietEntity>
    ) { }

    async find(categorie: string) {
        const result = await this.productRepository.findOne({
            where: {
                name: categorie
            }
        })
        return result
    }


    async insertProductCategorie(categorie: ProductsCategorietDTO) {
        const productSave = this.productRepository.create(categorie)
        return await this.productRepository.save(productSave)
    }
}


