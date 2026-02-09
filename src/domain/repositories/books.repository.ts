import { QueryParamsDto } from '@/application/dto/query-params.dto';
import { Book } from '../entities/book/book.entity';

export abstract class BooksRepository {
  abstract register(book: Book): Promise<Book>;
  abstract findAll(params?: QueryParamsDto): Promise<Book[]>;
  abstract findById(id: string): Promise<Book | null>;
  abstract delete(id: string): Promise<void>;
}
