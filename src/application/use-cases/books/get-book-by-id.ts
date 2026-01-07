import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '@/domain/repositories/books.repository';
import { Book } from '@/domain/entities/book/book.entity';

interface GetBookByIdRequest {
  id: string;
}

@Injectable()
export class GetBookByIdUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({ id }: GetBookByIdRequest): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new NotFoundException('Livro não encontrado');
    }

    return book;
  }
}
