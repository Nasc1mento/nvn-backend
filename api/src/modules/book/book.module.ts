import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "./book.schema";
import { User, UserSchema } from "../user/user.schema";


@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: Book.name,
                schema: BookSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService]
})

export class BookModule {}