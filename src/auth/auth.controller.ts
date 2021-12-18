import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * authorize account using email and password
   */
  @Post()
  @Public()
  login(
    @Body() loginRequest: LoginDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    this.authService.login(loginRequest, response, request);
  }

  /**
   * throw unauthorize error(for testing)
   */
  @Get('unauthorize')
  throwNewError() {
    throw new UnauthorizedException();
  }
}
