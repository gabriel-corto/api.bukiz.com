import { Replace } from '@/helpers/replace';
import { ulid } from 'ulidx';

export interface UserProps {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
      { createdAt?: Date; id?: string; updatedAt?: Date }
    >,
  ) {
    this.props = {
      ...props,
      id: props.id ?? ulid(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };

    this.validateEmail(this.props.email);
  }

  public get id(): string {
    return this.props.id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | string | undefined {
    return this.props.updatedAt;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.validateEmail(email);
    this.props.email = email;
    this.props.updatedAt = new Date();
  }

  private validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      throw new Error('Email Inválido');
    }
  }
}

export class UserPresenter {
  static toHttp(user: User) {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
