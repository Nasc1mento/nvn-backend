import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema         
            }
        ])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserMoule {}