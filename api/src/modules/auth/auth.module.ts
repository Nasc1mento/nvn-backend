import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guard/auth.guard";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/user.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRE_IN'),
        },
      }),
        inject: [ConfigService],
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