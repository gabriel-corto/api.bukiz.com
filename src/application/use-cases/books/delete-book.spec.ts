import { InMemoryBooksRepository } from '@/infra/database/in-memory/in-memory.books.repository';
import { DeleteBookUseCase } from './delete-book';
import { Book } from '@/domain/entities/book/book.entity';
import { Price } from '@/domain/entities/book/value-objects/price';
import { NotFoundException } from '@nestjs/common';

describe('Delete Book', () => {
  let booksRepository: InMemoryBooksRepository;
  let deleteBook: DeleteBookUseCase;

  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository();
    deleteBook = new DeleteBookUseCase(booksRepository);
  });

  const makeBook = (overrides?: Partial<any>) => {
    return Book.register({
      author: 'Uncle Bob',
      price: new Price(13500),
      stock: 20,
      title: 'Clean Code',
      category: 'Technology',
      ...overrides,
    });
  };

  it('Should be able to delete a book', async () => {
    const book = makeBook();
    await booksRepository.register(book);

    await deleteBook.execute(book.id);

    expect(booksRepository.books).toHaveLength(0);
  });

  it('Should not be able to delete a non-existing book', async () => {
    await expect(deleteBook.execute('non-existing-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
