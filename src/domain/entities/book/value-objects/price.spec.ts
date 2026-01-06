import { Price } from './price';

it('Should not be able create a price with negative value', () => {
  expect(() => {
    Price.create(0);
  }).toThrow();
});
