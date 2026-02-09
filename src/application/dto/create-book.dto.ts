import { BookCategory } from '@/types/enums';

export class CreateBookDto {
  author: string;
  title: string;
  stock: number;
  price: number;
  category: BookCategory;
}
