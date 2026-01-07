import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';
import { BooksController } from '../controllers/books.controller';

import { RegisterBookUseCase } from '@/application/use-cases/books/register-book';
import { FetchBooksUseCase } from '@/application/use-cases/books/fetch-books';
import { GetBookByIdUseCase } from '@/application/use-cases/books/get-book-by-id';
import { DeleteBookUseCase } from '@/application/use-cases/books/delete-book';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [
    RegisterBookUseCase,
    FetchBooksUseCase,
    GetBookByIdUseCase,
    DeleteBookUseCase,
  ],
  exports: [
    RegisterBookUseCase,
    FetchBooksUseCase,
    GetBookByIdUseCase,
    DeleteBookUseCase,
  ],
})
export class BooksModule {}
