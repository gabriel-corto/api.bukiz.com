import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateBookBody } from '../dto/create-book-body';
import { RegisterBookUseCase } from '@/application/use-cases/books/register-book';
import { BooksViewModel } from '../view-model/books-view-model';
import { Public } from '@/infra/shared/decorators/public.decorator';
import { FindByIdDto } from '@/infra/shared/dto/find-by-id.dto';
import { FetchBooksUseCase } from '@/application/use-cases/books/fetch-books';
import { GetBookByIdUseCase } from '@/application/use-cases/books/get-book-by-id';
import { DeleteBookUseCase } from '@/application/use-cases/books/delete-book';
import { DeleteItemDto } from '@/infra/shared/dto/delete-item.dto';

@Controller('/books')
export class BooksController {
  constructor(
    private createBook: RegisterBookUseCase,
    private fetchBooks: FetchBooksUseCase,
    private getBookById: GetBookByIdUseCase,
    private deleteBook: DeleteBookUseCase,
  ) {}

  @Public()
  @Get()
  async findAll() {
    const books = await this.fetchBooks.execute();

    return {
      data: BooksViewModel.toManyHttp(books),
    };
  }

  @Public()
  @Get(':id')
  async findById(@Param() param: FindByIdDto) {
    const book = await this.getBookById.execute({ id: param.id });

    return {
      book: BooksViewModel.toHttp(book),
    };
  }

  @Public()
  @Post()
  async create(@Body() body: CreateBookBody) {
    const book = await this.createBook.execute(body);

    return {
      book: BooksViewModel.toHttp(book),
    };
  }

  @Public()
  @Delete(':id')
  async delete(@Param() param: DeleteItemDto) {
    await this.deleteBook.execute(param.id);
  }
}
