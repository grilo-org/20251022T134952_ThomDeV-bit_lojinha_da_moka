import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, ApiParam } from '@nestjs/swagger';
import dataSource from './database/config/database.config';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {

    dataSource.initialize().then(() => {
        console.log('Database Connected')
    })
    const app = await NestFactory.create<INestApplication>(AppModule.register(), {
        bufferLogs: true,
        cors: true
    });

    app.flushLogs()

    const config = new DocumentBuilder()
        .setTitle('Lojinha da moka')
        .setDescription('good fly ')
        .setVersion('1.0')
        .addTag('moka')
        .addBearerAuth({
            type: 'apiKey',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'ENTER JWT TOKEN',
            in: 'header'
        }, "JWT-auth")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3000);

    const url = await app.getUrl()
    console.log(`Swagger application is running on: ${url}/swagger`)
}
bootstrap();
