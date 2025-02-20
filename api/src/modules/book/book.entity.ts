import { IsNotEmpty } from "class-validator";
import { Book } from "./book.schema";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class BookEntity implements Book {
    @ApiProperty()
    @Expose()
    id?: string
    @ApiProperty()
    @IsNotEmpty({message: 'The user id is required'})
    @Expose()
    userId: string;
    @ApiProperty()
    @IsNotEmpty({message: 'The title is required'})
    @Expose()
    title: string;
    @ApiProperty()
    @IsNotEmpty({message: 'The author is required'})
    @Expose()
    author: string;
    @ApiProperty()
    @IsNotEmpty({message: 'The genre is required'})
    @Expose()
    genre: string;
    @ApiProperty()
    @IsNotEmpty({message: 'The number of pages is required'})
    @Expose()
    pages: number;
}

export class BookCreateDto extends OmitType(BookEntity, ['id', 'userId']) {}
export class BookUpdateDto extends OmitType(PartialType(BookEntity), ['id','userId']) {}