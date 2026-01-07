import { ulid } from 'ulidx';
import { Price } from './value-objects/price';

import { constants } from '@/infra/constant/constant';
import { MakeOptional } from '@/helpers/make-optional';

export type BookCategory =
  | 'Finance'
  | 'Technology'
  | 'Business'
  | 'Education'
  | 'Health';

export interface BookProps {
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

  private constructor(props: BookProps) {
    this.props = props;
  }

  public static register(
    props: MakeOptional<BookProps, 'id' | 'cover' | 'createdAt' | 'stock'>,
  ): Book {
    return new Book({
      ...props,
      id: props.id ?? ulid(),
      stock: props.stock ?? 10,
      cover: props.cover ?? constants.default_cover_url,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  public static restore(props: BookProps): Book {
    return new Book(props);
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
  get price(): Price {
    return this.props.price;
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
