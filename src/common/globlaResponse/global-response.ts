import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';

export interface IGlobalResponse<T> {
    STATUS: string;
    MENSAGE: string;
    RESPONSE: any
}

export class GlobalResponse<T> implements NestInterceptor<T, IGlobalResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IGlobalResponse<T>> {
        const response = context.switchToHttp().getResponse<Response>();
        const STATUS = response.statusCode >= 200 && response.statusCode <= 299 ? 'OK' : 'ERRO';
        let MENSAGE = response.req.method;

        switch (MENSAGE) {
            case 'GET':
                MENSAGE = 'RESEARCH CARRIED OUT SUCCESSFULLY';
                break;

            case 'POST':
                MENSAGE = 'EXECUTED SUCCESSFULLY';
                break;
            case 'PUT':
                MENSAGE = 'UPDATED SUCCESSFULLY';
                break;
            case 'DELETED':
                MENSAGE = 'SUCCESSFULLY DELETED';
                break;
            default:
                MENSAGE = 'SUCCESS';
                break;

        }
        return next.handle().pipe(
            map(responseBody => ({
                STATUS,
                MENSAGE,
                RESPONSE: responseBody
            }))
        );
    }
}
