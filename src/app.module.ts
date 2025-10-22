import { DynamicModule, Module } from '@nestjs/common';
import { TypeormModule } from './database/reposiotory/typeorm-module';
import { RepositoryModule } from './database/reposiotory/repository.module';
import { UseCaseModule } from './use-case/use-cases.module';
import { ApiModule } from './api/api.module';
import { LoggerModule } from 'nestjs-pino';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';
import pino from 'pino/pino';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

@Module({})
export class AppModule {
    static register(): DynamicModule {

        const imports = [
            LoggerModule.forRoot({
                pinoHttp: {
                    level: 'info',
                    timestamp: () => `,"timestamp":"${new Date().toLocaleString()}"`,
                    serializers: {
                        req(req) {
                            req.body = req.raw.body;
                            return req.query;
                        },
                        res(res) {
                            res.body = res.raw.body;
                            return res;
                        },
                    },
                }
            }),
            ScheduleModule.forRoot(),
            JwtModule.register({
                global: true,
                secret: process.env.SECRET_KEY,
                signOptions: {
                    expiresIn: 3600
                },
                verifyOptions: {
                    ignoreExpiration: false
                }
            }),
            TypeormModule.register(RepositoryModule.register()),

            ApiModule.register({
                useCaseModule: UseCaseModule.register()
            }),
            CacheModule.register<RedisClientOptions>({
                isGlobal: true,
                store: redisStore,
                socket: {
                    port: 6379,
                    host: 'redis'
                },
                ttl: 6000,

            })
        ]

        return {
            module: AppModule,
            imports
        };
    }
}


