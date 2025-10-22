import { Body, Controller, Get, Param, Post, Query, Req, UnprocessableEntityException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductUsecase } from "src/use-case/product/product-usecase";
import { ProductDTO } from "../dtos/product.dto";
import { ProductImageUsecase } from "src/use-case/product-images/product-image-usecase";
import { ProductImageDTO } from "../dtos/productstImage.dto";
import { ProductsCategorietDTO } from "../dtos/productCategorie.dto";

@Controller('product')
@ApiTags('product')
export class ProductController {
    constructor(
        private readonly productUsecase: ProductUsecase,
        private readonly productImageUsecase: ProductImageUsecase,


    ) { }

    @Get('/')
    async getProduct() {
        return await this.productUsecase.getProcuct()
    }



    @Post('image/create')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async createProductImage(@Query('product') productId: string, @UploadedFile() file: Express.Multer.File) {
        const products = await this.productImageUsecase.createProductImage(productId, file)
        console.log({ products, file })
        return { products, file }


    };


    @Post('create')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'integer' },
                quantity: { type: 'integer' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(
        @Body() product: ProductDTO,
        @Query('categoria') categorie: string,
        @UploadedFile() file: Express.Multer.File) {

        const result = await this.productUsecase.createProduct(product, categorie, file)
        return result
    }

}
