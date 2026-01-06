import { Book } from '@/domain/entities/book/book.entity';

export class BooksViewModel {
  static toHttp(book: Book) {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      price: book.price,
      stock: book.stock,
      category: book.category,
      createdAt: book.createdAt,
    };
  }
}
