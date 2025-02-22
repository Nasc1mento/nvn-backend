import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";


export class BookDTO {
    @Expose()
    readonly id: string

    @Expose()
    readonly title: string;

    @Expose()
    readonly author: string;

    @Expose()
    readonly genre: string;

    @Expose()
    readonly pages: number;
}

export class BookCreateDTO {
    @IsString()
    readonly title: string;

    @IsString()
    readonly author: string;

    @IsString()
    readonly genre: string;

    @IsNumber()
    @Min(1)
    readonly pages: number;
}

export class BookUpdateDTO {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsString()
    readonly genre: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly pages: number;
}