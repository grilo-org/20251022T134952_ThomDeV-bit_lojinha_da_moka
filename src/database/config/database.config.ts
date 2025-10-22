import { DataSource, DataSourceOptions } from 'typeorm';
import { RolesEntity } from '../entities/roles.entity';
import { UserEntity } from '../entities/user.entity';
import { UserPermissionEntity } from '../entities/user-permission.entiry';
import { ProductEntity } from '../entities/product.entity';
import { ProductImagesEntity } from '../entities/products-images.entity';
import { ProductsByOrderEntity } from '../entities/productsByOrder.entity';
import { ProductsCategorietEntity } from '../entities/products-categories.entity';
import { OrderstEntity } from '../entities/orders.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_LOCAL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    cache: true,
    entities: [UserEntity, RolesEntity, UserPermissionEntity, ProductEntity, ProductImagesEntity, ProductsByOrderEntity, ProductsCategorietEntity, OrderstEntity],
    migrations: [],
    synchronize: true,
    logging: 'all'
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
