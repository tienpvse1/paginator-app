import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './interceptor/response.interceptor';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './filter/exception.filter';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { ProductModule } from './product/product.module';
import { RoleGuard } from './auth/guard/role.guard';
import { FormModule } from './form/form.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('database.host'),
          port: config.get<number>('database.port'),
          username: 'root',
          password: config.get<string>('database.password'),
          database: config.get<string>('database.db'),
          entities: ['dist/**/entities/*.entity{.ts,.js}'],
          logger: 'advanced-console',
          synchronize: true,
          logging: 'all',
        };
      },
    }),
    UserModule,
    AuthModule,
    ProductModule,
    FormModule,
    OrderModule,
    OrderDetailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
