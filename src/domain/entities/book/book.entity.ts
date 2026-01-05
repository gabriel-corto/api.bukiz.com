import { ulid } from 'ulidx';

interface BookProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: string;
  createdAt: Date;
}

export class Book {
  private props: BookProps;

  constructor(props: BookProps) {
    this.props = {
      ...props,
      id: ulid(),
      createdAt: props.createdAt ?? new Date(),
    };
  }
}
