import { DynamicModule, Module } from '@nestjs/common';
import { OPTIONS_TYPE } from './typeorm-module-definition';
import { UserEntity } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_TOKENS } from './tokens';
import { RolesEntity } from '../entities/roles.entity';
import { UserPermissionRepository } from './userPermission/user-permission.repository';
import { UserPermissionEntity } from '../entities/user-permission.entiry';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from './product/product.repository';
import { dataSourceOptions } from '../config/database.config';
import { ProductImagesEntity } from '../entities/products-images.entity';
import { OrderstEntity } from '../entities/orders.entity';
import { ProductsCategorietEntity } from '../entities/products-categories.entity';
import { ProductsByOrderEntity } from '../entities/productsByOrder.entity';
import { OrdersRepository } from './orders/orders.repository';
import { ProductImagesRepository } from './product-images/product-images.repository';
import { ProductsCategorieRepository } from './product-categorie/product-categorie.repository';

@Module({})
export class TypeormModule {
    static register(options: typeof OPTIONS_TYPE): DynamicModule {
        const entitiesSchema = [
            UserEntity,
            RolesEntity,
            UserPermissionEntity,
            ProductEntity,
            ProductImagesEntity,
            ProductsByOrderEntity,
            ProductsCategorietEntity,
            OrderstEntity,

        ];
        const config = dataSourceOptions;
        return {
            module: TypeormModule,
            global: true,
            imports: [
                TypeOrmModule.forFeature(entitiesSchema),
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            autoLoadEntities: true,
                            ...config
                        };
                    }
                })
            ],

            exports: [TYPEORM_TOKENS.USER_REPOSITORY,
            TYPEORM_TOKENS.ROLES_REPOSIOTRY,
            TYPEORM_TOKENS.USER_PERMISSION_REPOSIOTRY,
            TYPEORM_TOKENS.PRODUCT_REPOSITORY,
            TYPEORM_TOKENS.ORDER_REPOSITORY,
            TYPEORM_TOKENS.PRODUCTS_IMAGE_REPOSITORY,
            TYPEORM_TOKENS.PRODUCTS_CATEGORIE_REPORITORY

            ],

            providers: [
                {
                    provide: TYPEORM_TOKENS.USER_REPOSITORY,
                    useClass: options.userRepository
                },
                {
                    provide: TYPEORM_TOKENS.ROLES_REPOSIOTRY,
                    useClass: options.rolesRepository
                },
                {
                    provide: TYPEORM_TOKENS.USER_PERMISSION_REPOSIOTRY,
                    useClass: UserPermissionRepository
                },
                {
                    provide: TYPEORM_TOKENS.PRODUCT_REPOSITORY,
                    useClass: ProductRepository
                },
                {
                    provide: TYPEORM_TOKENS.ORDER_REPOSITORY,
                    useClass: OrdersRepository
                },
                {
                    provide: TYPEORM_TOKENS.PRODUCTS_IMAGE_REPOSITORY,
                    useClass: ProductImagesRepository
                },
                {
                    provide: TYPEORM_TOKENS.PRODUCTS_CATEGORIE_REPORITORY,
                    useClass: ProductsCategorieRepository
                }
            ]
        };
    }
}
