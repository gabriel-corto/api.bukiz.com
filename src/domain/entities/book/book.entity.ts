import { constants } from '@/infra/constant/constant';
import { ulid } from 'ulidx';
import { Price } from './value-objects/price';
import { MakeOptional } from '@/helpers/make-optional';

export type BookCategory =
  | 'Finance'
  | 'Technology'
  | 'Business'
  | 'Education'
  | 'Health';

interface BookProps {
  id: string;
  title: string;
  cover?: string | null;
  author: string;
  price: Price;
  stock: number;
  category: BookCategory;
  createdAt: Date;
}

export class Book {
  private props: BookProps;

  constructor(props: MakeOptional<BookProps, 'id' | 'cover' | 'createdAt'>) {
    this.props = {
      ...props,
      id: props.id ?? ulid(),
      stock: props.stock ?? 10,
      cover: props.cover ?? constants.default_cover_ur,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): string {
    return this.props.id;
  }
  get title(): string {
    return this.props.title;
  }
  get cover(): string | undefined | null {
    return this.props.cover;
  }
  get author(): string {
    return this.props.author;
  }
  get price(): number {
    return this.props.price.amount;
  }
  get stock(): number {
    return this.props.stock;
  }
  get category(): BookCategory {
    return this.props.category;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
