import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { CRUDService } from 'src/base/base.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService extends CRUDService<User, UserRepository> {
  constructor(
    @InjectRepository(UserRepository) repository: UserRepository,
    private jwt: JwtService,
  ) {
    super(repository);
  }
  async login(loginDto: LoginDto, res: Response, req: Request) {
    try {
      const { name, email, id, role } = await this.repository.login(loginDto);
      const token: TokenDto = {
        subject: name,
        publicData: {
          email,
          id,
          role,
        },
      };
      res.cookie('token', this.jwt.sign({ ...token }));
      res.json({
        publicData: {
          email,
          id,
          role,
        },
      });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        statusCode: error.status,
        message: error.message,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }
  }
}
