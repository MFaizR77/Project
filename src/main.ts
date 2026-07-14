import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new HttpExceptionFilter());

  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  
  app.use(cookieParser());
  
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS Auth API')
  .setDescription('API documentation for NestJS Auth project')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  
  const port = configService.get<number>('PORT') || 3000;
  
  await app.listen(port);
  
  // app.enableCors({
    //   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    //   credentials: true, // Penting untuk cookies
    // });

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger API documentation is available at: ${await app.getUrl()}/api`);
  
}
bootstrap();
