import { Book } from './book.entity';
import { Price } from './value-objects/price';

describe('Book Entity', () => {
  it('Should be able to register a new book', () => {
    const book = Book.register({
      author: 'Uncle Bob',
      price: Price.create(13500),
      stock: 20,
      title: 'Clean Code',
      category: 'Technology',
    });

    expect(book).toBeDefined();
  });
});
