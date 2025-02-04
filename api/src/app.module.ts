import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { ConfigModule } from '@nestjs/config';
import { UserMoule } from './modules/user/user.module';

@Module({
  imports: [
      AuthModule,
      BookModule,
      UserMoule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
