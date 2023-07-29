import {Controller, Body, Post, UseGuards, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Roles } from "@app/jwt-authorization/decorator/roles.decorator";
import { JwtAuthGuard } from "@app/jwt-authorization/guard/jwt-auth.guard";
import { RolesGuard } from "@app/jwt-authorization/guard/roles.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Body('roles') roles: string[], // Получаем роли из тела запроса
  ): Promise<string> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Roles('admin')
  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  getUser(){
    return "ok";
  }

}