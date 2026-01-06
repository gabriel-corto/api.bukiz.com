import { Injectable } from '@nestjs/common';

import { Book } from '@/domain/entities/book/book.entity';
import { Price } from '@/domain/entities/book/value-objects/price';
import { BooksRepository } from '@/domain/repositories/books.repository';
import { CreateBookDto } from '@/application/dto/create-book.dto';

@Injectable()
export class RegisterBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(data: CreateBookDto): Promise<Book> {
    const { title, author, stock, category, price } = data;

    const book = Book.register({
      author,
      title,
      stock,
      category,
      price: new Price(price),
    });

    return await this.booksRepository.register(book);
  }
}
