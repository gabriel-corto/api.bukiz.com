import { Injectable } from '@nestjs/common';
import { BooksRepository } from '@/domain/repositories/books.repository';
import { QueryParamsDto } from '@/application/dto/query-params.dto';

@Injectable()
export class FetchBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(params?: QueryParamsDto) {
    const books = await this.booksRepository.findAll({
      size: params?.size,
    });

    return {
      books,
      metadata: {
        size: books.length,
        total: books.length,
      },
    };
  }
}
