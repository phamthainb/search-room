import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Search Room')
    .setDescription('The Search Room API description')
    .addTag('Search Room')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3004);
  Logger.log(await app.getUrl());
}
bootstrap();

export const service = {
  room: {
    url: 'http://localhost:3002',
  },
  order: {
    url: 'http://localhost:3003',
  },
  customer: {
    url: 'http://localhost:3000',
  },
  employee: {
    url: 'http://localhost:3001',
  },
  excel: {
    url: 'http://localhost:3006',
  },
  main: {
    url: 'http://localhost:3004', // <=====
  },
};
