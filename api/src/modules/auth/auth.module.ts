import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guard/auth.guard";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/user.schema";
import { AppConfigService } from "../config/config.service";
import { AppConfigModule } from "../config/config.module";


@Module({
    imports: [
      AppConfigModule,
      JwtModule.registerAsync({
        imports: [AppConfigModule],
        useFactory: async (configService: AppConfigService) => ({
        secret: configService.JWT_SECRET,
        signOptions: {
          expiresIn: configService.JWT_EXPIRE_IN,
        },
      }),
        inject: [AppConfigService],
      }),
      MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema,
        }
      ])
    ],
    controllers: [AuthController],
    providers: [
      AuthService,
      {
        provide: APP_GUARD,
        useClass: AuthGuard,
      }
    ],
    exports: [AuthService],  
})

export class AuthModule {}