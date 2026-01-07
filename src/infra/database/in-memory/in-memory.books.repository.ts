import { Book } from '@/domain/entities/book/book.entity';
import { BooksRepository } from '@/domain/repositories/books.repository';

export class InMemoryBooksRepository implements BooksRepository {
  public books: Book[] = [];

  async findAll(): Promise<Book[]> {
    await Promise.resolve();
    return this.books;
  }

  async findById(id: string): Promise<Book | null> {
    await Promise.resolve();
    const book = this.books.find((book) => book.id === id);

    if (!book) return null;
    return book;
  }

  async delete(id: string): Promise<void> {
    await Promise.resolve();
    this.books = this.books.filter((book) => book.id !== id);
  }

  async register(book: Book): Promise<Book> {
    await Promise.resolve();
    this.books.push(book);
    return book;
  }
}
