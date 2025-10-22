import { pinoHttp } from "pino-http";
import pino from 'pino';

export const logger = pinoHttp({
    transport: {
        targets: [
            {
                level: 'debug',
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            },
            {
                level: 'debug',
                target: 'pino-http-print',
                options: {
                    colorize: true
                }
            }
        ]
    }

})
