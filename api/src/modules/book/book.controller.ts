import { BookService } from "./book.service";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserId } from "../user/userIdFromToken.decorator";
import { BookCreateDTO, BookDTO, BookUpdateDTO } from "./book.dto";


@ApiBearerAuth()
@ApiTags('Books')
@Controller('books')
export class BookController {
    constructor( 
        private readonly bookService: BookService,
    ) {}

    @ApiCreatedResponse({description: 'Book created' })
    @ApiBadRequestResponse({ description: 'Invalid user Id' })
    @ApiNotFoundResponse({description: 'User not found' })
    @Post()
    async createBook(@UserId() userId: string, @Body() book: BookCreateDTO): Promise<BookDTO> {
        return this.bookService.createBook(userId, book);
    }

    @ApiOkResponse({description: 'Book found' })
    @ApiNotFoundResponse({description: 'Book not found' })
    @Get(':id')
    async getBookByid(@UserId() userId: string, @Param('id') id: string): Promise<BookDTO> {
        return this.bookService.findBookById(userId, id);
    }

    @ApiOkResponse({description: 'Books found' })
    @Get()
    async getAllBooks(@UserId() userId: string): Promise<BookDTO[]> {
        return this.bookService.findAllBooks(userId);
    }
    
    @ApiOkResponse({description: 'Book deleted' })
    @ApiNotFoundResponse({description: 'Book not found' })
    @Delete(':id')
    async deleteBookByid(@UserId() userId: string, @Param('id') id: string): Promise<void> {
        return this.bookService.deleteBookById(userId, id);
    }

    @ApiOkResponse({description: 'Book updated' })
    @ApiNotFoundResponse({description: 'Book not found' })
    @Put(':id')
    async updateBookByid(@UserId() userId: string, @Param('id') id: string, @Body() book: BookUpdateDTO): Promise<void> {
        return this.bookService.updateBookById(userId, id, book);
    }
}