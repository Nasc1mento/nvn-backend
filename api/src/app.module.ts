import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { ConfigModule } from '@nestjs/config';
import { UserMoule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    BookModule,
    UserMoule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
