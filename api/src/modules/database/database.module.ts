import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        uri: configService.MONGO_URI,
      }),
      inject: [AppConfigService],
    }),
  ],
  exports: [MongooseModule],

})
export class DatabaseModule {}