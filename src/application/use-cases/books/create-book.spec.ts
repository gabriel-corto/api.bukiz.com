import { InMemoryBooksRepository } from '@/infra/database/in-memory/in-memory.books.repository';
import { CreateBookUseCase } from './create-book';

describe('Create Book', () => {
  const booksRepository = new InMemoryBooksRepository();
  const createBook = new CreateBookUseCase(booksRepository);

  it('Should be able to create and save a new book', async () => {
    const book = await createBook.execute({
      author: 'Uncle Bob',
      stock: 20,
      title: 'Clean Code',
      price: 13750,
      category: 'Technology',
    });

    expect(book).toBeTruthy();
    expect(booksRepository.books[0]).toEqual(book);
  });
});
