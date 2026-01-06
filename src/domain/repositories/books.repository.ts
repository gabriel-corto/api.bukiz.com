import { Book } from '../entities/book/book.entity';

export abstract class BooksRepository {
  abstract register(book: Book): Promise<Book>;
  abstract findAll(): Promise<Book[]>;
}
