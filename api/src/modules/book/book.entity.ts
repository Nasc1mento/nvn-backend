import { IsNotEmpty } from "class-validator";
import { Book } from "./book.schema";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class BookEntity implements Book {
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
    @IsNotEmpty({message: 'The description is required'})
    @Expose()
    description: string;
}

export class BookCreateDto extends OmitType(BookEntity, ['id', 'userId']) {}
export class BookUpdateDto extends OmitType(PartialType(BookEntity), ['id','userId']) {}