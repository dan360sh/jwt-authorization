import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedAccess } from "@app/jwt-authorization/exception/unauthorized.exception";
import { JwtRsaService } from "@app/jwt-authorization/services/jwt-rsa.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtRsaService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }
    if(this.jwtService.verify(token.replace('Bearer ', ''))){
      return true;
    }
    throw new UnauthorizedAccess();
  }
}
