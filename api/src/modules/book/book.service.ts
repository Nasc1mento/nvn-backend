import { BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "./book.schema";
import { Model } from "mongoose";
import { BookCreateDto, BookEntity, BookUpdateDto } from "./book.entity";
import { User, UserDocument } from "../user/user.schema";
import { plainToInstance } from "class-transformer";



export class BookService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async createBook(userId: string, book: BookCreateDto): Promise<BookEntity> {
        const userExists = await this.userModel.findById(userId);
        if (!userExists) {
            throw new NotFoundException('User not found');
        }

        const newBook = new this.bookModel({ ...book, userId }).save();
        return plainToInstance(BookEntity, newBook);
    }

    async findBookById(userId: string, id: string): Promise<BookEntity> {
        const book = await this.bookModel.findById(id).where({ userId });
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return plainToInstance(BookEntity, book);
    }

    async findAllBooks(userId: string): Promise<BookEntity[]> {
        const books = await this.bookModel.find({ userId });
        return books.map(book => plainToInstance(BookEntity, book));
    }

    async deleteBookById(userId: string, id: string): Promise<any> {
        const bookExists = await this.bookModel.findById(id).where({ userId });
        if (!bookExists) {
            throw new BadRequestException('Book not found');
        }

        return bookExists.deleteOne();
    }

    async updateBookById(userId: string, id: string, book: BookUpdateDto): Promise<any> {
        const bookExists = await this.bookModel.findById(id).where({ userId });
        if (!bookExists) {
            throw new BadRequestException('Book not found');
        }

        return bookExists.updateOne(book);
    }
}