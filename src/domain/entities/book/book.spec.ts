import { Book } from './book.entity';
import { Price } from './value-objects/price';

describe('Book Entity', () => {
  it('Should be able to create a new book', () => {
    const book = new Book({
      author: 'Uncle Bob',
      price: new Price(13500),
      stock: 20,
      title: 'Clean Code',
      category: 'Technology',
    });

    expect(book).toBeDefined();
  });
});
