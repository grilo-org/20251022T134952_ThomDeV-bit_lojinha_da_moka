import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException } from "@nestjs/common";
import { GlobalResponse, IGlobalResponse } from "../globlaResponse/global-response";
import { HttpAdapterHost } from "@nestjs/core";

@Catch(HttpException)

export class AllExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logger: ConsoleLogger,
        private readonly httpAdapterHost: HttpAdapterHost
    ) { }
    catch(exception: any, host: ArgumentsHost) {
        this.logger.log(exception)
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const httpStatus = exception.getStatus();
        const message = exception instanceof HttpException && (exception.getResponse() as any).message
        const responseBody = {
            STATUS: String(httpStatus >= 200 && httpStatus <= 299 ? 'OK' : 'ERRO'), //String(httpStatus),
            MENSAGEM: exception instanceof HttpException && exception?.message && message,
            RESPOSTA: [],
        }
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
