import { Book } from '@/domain/entities/book/book.entity';
import { Price } from '@/domain/entities/book/value-objects/price';
import { Prisma, Book as PrismaBook } from '@prisma/client';

export class PrismaBooksMapper {
  static toPrisma(book: Book): Prisma.BookCreateInput {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      price: book.price,
      category: book.category,
      stock: book.stock,
      createdAt: book.createdAt,
    };
  }

  static toDomain(raw: PrismaBook): Book {
    return new Book({
      id: raw.id,
      author: raw.author,
      price: new Price(raw.price),
      category: raw.category,
      stock: raw.stock,
      title: raw.title,
      cover: raw.cover,
      createdAt: raw.createdAt,
    });
  }
}
