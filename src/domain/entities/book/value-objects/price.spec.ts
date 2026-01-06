import { Price } from './price';

it('Should not be able create a price with negative value', () => {
  expect(() => {
    new Price(0);
  }).toThrow();
});
