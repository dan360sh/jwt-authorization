import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import {UnauthorizedAccess} from "@app/jwt-authorization/exception/unauthorized.exception";

@Catch(UnauthorizedAccess)
export class UnauthorizedFilter implements ExceptionFilter {
    catch(exception: UnauthorizedAccess, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(401).json({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }
}