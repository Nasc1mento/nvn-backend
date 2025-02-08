import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { UserMoule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { AppConfigModule } from './modules/config/config.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    BookModule,
    UserMoule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
