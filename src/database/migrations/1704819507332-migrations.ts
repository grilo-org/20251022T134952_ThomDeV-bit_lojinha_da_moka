import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704819507332 implements MigrationInterface {
    name = 'Migrations1704819507332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products_categorie\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`productId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_images\` (\`id\` varchar(255) NOT NULL, \`image\` blob NULL, \`productId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`quantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_by_order\` (\`id\` varchar(255) NOT NULL, \`quantidade\` int NOT NULL, \`precoVenda\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`orderId\` varchar(36) NULL, \`productsId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` varchar(255) NOT NULL, \`valor_total\` int NOT NULL, \`status\` enum ('em_processamento', 'processado', 'cancelado') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(16) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` (\`email\`), UNIQUE INDEX \`IDX_8facb26d9198e66e95413a7983\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_permission\` (\`id\` varchar(255) NOT NULL, \`userId\` varchar(255) NULL, \`rolesId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products_categorie\` ADD CONSTRAINT \`FK_440cfae40af7380930c22b09c60\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_images\` ADD CONSTRAINT \`FK_7378beebe3320f7e6fe5bb3145f\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_by_order\` ADD CONSTRAINT \`FK_dddfbf69b7758670d4cb075146d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`products_by_order\` ADD CONSTRAINT \`FK_47032c72ecd5eddd7fa4a2663f4\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_permission\` ADD CONSTRAINT \`FK_deb59c09715314aed1866e18a81\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_permission\` ADD CONSTRAINT \`FK_5e7cff3a337cfc21df6c0b1f575\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE \`query-result-cache\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(255) NULL, \`time\` bigint NOT NULL, \`duration\` int NOT NULL, \`query\` text NOT NULL, \`result\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`query-result-cache\``);
        await queryRunner.query(`ALTER TABLE \`user_permission\` DROP FOREIGN KEY \`FK_5e7cff3a337cfc21df6c0b1f575\``);
        await queryRunner.query(`ALTER TABLE \`user_permission\` DROP FOREIGN KEY \`FK_deb59c09715314aed1866e18a81\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`products_by_order\` DROP FOREIGN KEY \`FK_47032c72ecd5eddd7fa4a2663f4\``);
        await queryRunner.query(`ALTER TABLE \`products_by_order\` DROP FOREIGN KEY \`FK_dddfbf69b7758670d4cb075146d\``);
        await queryRunner.query(`ALTER TABLE \`products_images\` DROP FOREIGN KEY \`FK_7378beebe3320f7e6fe5bb3145f\``);
        await queryRunner.query(`ALTER TABLE \`products_categorie\` DROP FOREIGN KEY \`FK_440cfae40af7380930c22b09c60\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`user_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_8facb26d9198e66e95413a7983\` ON \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` ON \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`products_by_order\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`products_images\``);
        await queryRunner.query(`DROP TABLE \`products_categorie\``);
    }

}
