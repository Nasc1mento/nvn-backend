import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "./book.schema";
import { Model } from "mongoose";
import { User, UserDocument } from "../user/user.schema";
import { plainToInstance } from "class-transformer";
import { BookCreateDTO, BookDTO, BookUpdateDTO } from "./book.dto";

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async createBook(userId: string, book: BookCreateDTO): Promise<BookDTO> {
        const userExists = await this.userModel.findById(userId);
        if (!userExists) {
            throw new NotFoundException('User not found');
        }

        const newBook = new this.bookModel({ ...book, userId }).save();
        return plainToInstance(BookDTO, newBook);
    }

    async findBookById(userId: string, id: string): Promise<BookDTO> {
        const book = await this.bookModel.findById(id).where({ userId });
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return plainToInstance(BookDTO, book);
    }

    async findAllBooks(userId: string): Promise<BookDTO[]> {
        const books = await this.bookModel.find({ userId });
        return books.map(book => plainToInstance(BookDTO, book));
    }

    async deleteBookById(userId: string, id: string): Promise<any> {
        const bookExists = await this.bookModel.findById(id).where({ userId });
        if (!bookExists) {
            throw new BadRequestException('Book not found');
        }

        return bookExists.deleteOne();
    }

    async updateBookById(userId: string, id: string, book: BookUpdateDTO): Promise<any> {
        const bookExists = await this.bookModel.findById(id).where({ userId });
        if (!bookExists) {
            throw new BadRequestException('Book not found');
        }

        return bookExists.updateOne(book);
    }
}