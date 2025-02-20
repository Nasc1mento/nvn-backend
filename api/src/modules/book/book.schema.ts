import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop()
    userId: string;
    @Prop()
    title: string;
    @Prop()
    author: string;
    @Prop()
    genre: string;
    @Prop()
    pages: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);