import {
    ExceptionFilter,
    ArgumentsHost,
    Catch,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception.getResponse();    

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: typeof exceptionResponse === 'string' 
                ? exceptionResponse 
                : (exceptionResponse as any).message || exception.message,
            error: typeof exceptionResponse === 'object' 
                ? (exceptionResponse as any).error 
                : exception.name,
        };

        // Kirim response ke client
        response.status(status).json(errorResponse);
    }        
}