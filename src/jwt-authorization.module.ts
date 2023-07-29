import { Module } from '@nestjs/common';
import { JwtAuthorizationService } from './jwt-authorization.service';
import { APP_FILTER } from "@nestjs/core";
import { UnauthorizedFilter } from "@app/jwt-authorization/global/app.filter";
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
      JwtAuthorizationService,
      {
        provide: APP_FILTER,
        useClass: UnauthorizedFilter,
      },
  ],
  exports: [
    JwtAuthorizationService],
})
export class JwtAuthorizationModule {

}
