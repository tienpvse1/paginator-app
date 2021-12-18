import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenDto } from '../dto/token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.get<string>('SECRET_TOKEN'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          try {
            const data = request?.cookies['token'] || '';
            return data;
          } catch (error) {
            return '';
          }
        },
      ]),
    });
  }

  validate(payload: TokenDto) {
    return payload.publicData;
  }
}
