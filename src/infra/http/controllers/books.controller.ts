import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBookBody } from '../dto/create-book-body';
import { CreateBookUseCase } from '@/application/use-cases/books/create-book';
import { BooksViewModel } from '../view-model/books-view-model';
import { Public } from '@/infra/shared/decorators/public.decorator';
import { BooksRepository } from '@/domain/repositories/books.repository';

@Controller('/books')
export class BooksController {
  constructor(
    private createBook: CreateBookUseCase,
    private booksRepository: BooksRepository,
  ) {}

  @Public()
  @Get()
  async findAll() {
    const books = await this.booksRepository.findAll();

    return {
      data: books.map((book) => BooksViewModel.toHttp(book)),
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
}
