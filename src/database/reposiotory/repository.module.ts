import { OrdersRepository } from "./orders/orders.repository";
import { ProductsCategorieRepository } from "./product-categorie/product-categorie.repository";
import { ProductImagesRepository } from "./product-images/product-images.repository";
import { ProductRepository } from "./product/product.repository";
import { RolesRepository } from "./roles/roles.repository";
import { UserRepository } from "./user/user.repository";
import { UserPermissionRepository } from "./userPermission/user-permission.repository";
export class RepositoryModule {
    static register() {
        return {
            userRepository: UserRepository,
            rolesRepository: RolesRepository,
            userPermissionRepository: UserPermissionRepository,
            productRepository: ProductRepository,
            orderRepository: OrdersRepository,
            productsImageRepository: ProductImagesRepository,
            productCategorieRepository : ProductsCategorieRepository


        }
    }
}
