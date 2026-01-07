import { Injectable } from '@nestjs/common';
import { BooksRepository } from '@/domain/repositories/books.repository';
import { Book } from '@/domain/entities/book/book.entity';

@Injectable()
export class FetchBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(): Promise<Book[]> {
    return await this.booksRepository.findAll();
  }
}
