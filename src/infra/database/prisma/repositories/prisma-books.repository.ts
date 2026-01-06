import { Book } from '@/domain/entities/book/book.entity';
import { BooksRepository } from '@/domain/repositories/books.repository';
import { PrismaService } from '../prisma.service';
import { PrismaBooksMapper } from '../mappers/prisma-books-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Book[]> {
    const books = await this.prisma.book.findMany();
    return books.map((book) => PrismaBooksMapper.toDomain(book));
  }

  async create(book: Book): Promise<Book> {
    const createdBook = await this.prisma.book.create({
      data: PrismaBooksMapper.toPrisma(book),
    });

    return PrismaBooksMapper.toDomain(createdBook);
  }
}
