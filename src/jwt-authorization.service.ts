import { Injectable } from '@nestjs/common';
import { JwtRsaService } from "@app/jwt-authorization/services/jwt-rsa.service";

@Injectable()
export class JwtAuthorizationService {
  constructor(
    private readonly jwtRsaService: JwtRsaService
  ) {
    jwtRsaService.loadPublicToken();
  }
}
