import { Book } from '@/domain/entities/book/book.entity';
import { BooksRepository } from '@/domain/repositories/books.repository';
import { PrismaService } from '../prisma.service';
import { PrismaBooksMapper } from '../mappers/prisma-books-mapper';
import { Injectable } from '@nestjs/common';
import { QueryParamsDto } from '@/application/dto/query-params.dto';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: QueryParamsDto): Promise<Book[]> {
    const { size } = params;

    const books = await this.prisma.book.findMany({
      take: Number(size) || 10,
    });

    return books.map((book) => PrismaBooksMapper.toDomain(book));
  }

  async findById(id: string): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) return null;
    return PrismaBooksMapper.toDomain(book);
  }

  async register(book: Book): Promise<Book> {
    const createdBook = await this.prisma.book.create({
      data: PrismaBooksMapper.toPrisma(book),
    });

    return PrismaBooksMapper.toDomain(createdBook);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.book.delete({
      where: { id },
    });
  }
}
