import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './modules/config/config.service';
import { ExpressAdapter } from '@nestjs/platform-express';


async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const configService = app.get(AppConfigService);
  // const httpsOptions = {
  //   key: fs.readFileSync(configService.SSL_KEY_PATH),
  //   cert: fs.readFileSync(configService.SSL_CERT_PATH),
  // };

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

  http.createServer(server).listen(configService.PORT);
  // https.createServer(httpsOptions, server).listen(443);
  await app.init();
}

bootstrap();