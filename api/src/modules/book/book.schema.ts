import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop()
    userId: string;
    @Prop()
    title: string;
    @Prop()
    description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);