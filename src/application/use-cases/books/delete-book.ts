import { BooksRepository } from '@/domain/repositories/books.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(id: string): Promise<void> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.booksRepository.delete(book.id);
  }
}
