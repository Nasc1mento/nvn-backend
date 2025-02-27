import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './modules/config/config.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
  .setTitle('API TADW')
  .setDescription('Tópicos Avançados em Desenvolvimento Web')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.PORT);
}

bootstrap();