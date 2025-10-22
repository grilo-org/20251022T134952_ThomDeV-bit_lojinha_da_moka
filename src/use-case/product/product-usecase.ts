import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { ProductDTO } from "src/api/dtos/product.dto";
import { ProductsCategorietDTO } from "src/api/dtos/productCategorie.dto";
import { ProductImageDTO } from "src/api/dtos/productstImage.dto";
import { ProductImagesEntity } from "src/database/entities/products-images.entity";
import { ProductsCategorieRepository } from "src/database/reposiotory/product-categorie/product-categorie.repository";
import { ProductImagesRepository } from "src/database/reposiotory/product-images/product-images.repository";
import { ProductRepository } from "src/database/reposiotory/product/product.repository";
import { TYPEORM_TOKENS } from "src/database/reposiotory/tokens";
import { ProductCategorie } from "src/domain/product-categorie.domain";
import { ProductImage } from "src/domain/product-image.domain";
import { v4 } from "uuid";

@Injectable()

export class ProductUsecase {
    constructor(
        @Inject(TYPEORM_TOKENS.PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository,
        @Inject(TYPEORM_TOKENS.PRODUCTS_IMAGE_REPOSITORY)
        private readonly productImageRepository: ProductImagesRepository,
        @Inject(TYPEORM_TOKENS.PRODUCTS_CATEGORIE_REPORITORY)
        private readonly productCategorieRepository: ProductsCategorieRepository
    ) { }

    async getProcuct() {
        const product = await this.productRepository.find()
        return product
    }

    async createProduct(product: ProductDTO, categorie: string, file: Express.Multer.File) {
        const id = v4()
        const products = await this.productRepository.insertProduct({
            id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        })

        if (!products) {
            throw new UnprocessableEntityException('Erro ao criar produto');
        }

        const categorieExist = await this.productCategorieRepository.find(categorie)

        let resultCategorie;
        let imageResult;

        if (!categorieExist) {
            const categories = new ProductsCategorietDTO()
            const newCategorie = new ProductCategorie(categories)
            newCategorie.id = v4()
            newCategorie.name = categorie
            newCategorie.product = products
            resultCategorie = await this.productCategorieRepository.insertProductCategorie(newCategorie)

            const image = new ProductImageDTO()
            const newImage = new ProductImage(image)
            newImage.id = v4()
            newImage.image = file.buffer
            newImage.product = products
            imageResult = await this.productImageRepository.createProductImage(newImage)


        }
        else {
            const categories = new ProductsCategorietDTO()
            const newCategorie = new ProductCategorie(categories)
            newCategorie.id = v4()
            newCategorie.name = categorieExist.name
            newCategorie.product = products
            resultCategorie = await this.productCategorieRepository.insertProductCategorie(newCategorie)

            const image = new ProductImageDTO()
            const newImage = new ProductImage(image)
            newImage.id = v4()
            newImage.image = file.buffer
            newImage.product = products
            imageResult = await this.productImageRepository.createProductImage(newImage)
        }

        return {
            products,
            imageResult,
            resultCategorie
        }
    }

}
