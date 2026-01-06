import { Book } from '@/domain/entities/book/book.entity';
import { BooksRepository } from '@/domain/repositories/books.repository';

export class InMemoryBooksRepository implements BooksRepository {
  public books: Book[] = [];

  async findAll(): Promise<Book[]> {
    await Promise.resolve();
    return this.books;
  }

  async register(book: Book): Promise<Book> {
    await Promise.resolve();
    this.books.push(book);
    return book;
  }
}
