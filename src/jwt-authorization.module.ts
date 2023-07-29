import { Module } from '@nestjs/common';
import { JwtAuthorizationService } from './jwt-authorization.service';
import { APP_FILTER } from "@nestjs/core";
import { UnauthorizedFilter } from "@app/jwt-authorization/global/app.filter";
import { HttpModule } from "@nestjs/axios";
import { JwtRsaService } from "@app/jwt-authorization/services/jwt-rsa.service";

@Module({
  imports: [HttpModule],
  providers: [
      JwtAuthorizationService,
      JwtRsaService,
      {
        provide: APP_FILTER,
        useClass: UnauthorizedFilter,
      },
  ],
  exports: [
    JwtAuthorizationService, JwtRsaService
  ],
})
export class JwtAuthorizationModule {

}
