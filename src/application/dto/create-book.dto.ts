import { BookCategory } from '@/domain/entities/book/book.entity';

export class CreateBookDto {
  author: string;
  title: string;
  stock: number;
  price: number;
  category: BookCategory;
}
