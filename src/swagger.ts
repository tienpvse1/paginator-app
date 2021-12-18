import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwaggerDoc = (
  app: INestApplication,
  config: ConfigService,
) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Paginator example APIs')
    .setDescription('The paginator example APIS')
    .setVersion(config.get<string>('app.appVersion'))
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
};
