import { ulid } from 'ulidx';

export interface UserProps {
  id?: string;
  email: string;
  name?: string;
  avatar?: string;
  updatedAt?: Date | string;
  createdAt?: Date | string;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps, id?: string, createdAt?: string) {
    this.props.id = id ?? ulid();
    this.props.createdAt = createdAt ?? new Date();

    this.props = {
      ...props,
      updatedAt: props.updatedAt ?? new Date(),
    };

    this.validateEmail(this.props.email);
  }

  get id(): string | null {
    return this.props.id ?? null;
  }

  get createdAt(): Date | string | null {
    return this.props.createdAt ?? null;
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string | null {
    return this.props.name ?? null;
  }

  get avatar(): string | null {
    return this.props.avatar ?? null;
  }

  get updatedAt(): Date | null | string {
    return this.props.updatedAt ?? null;
  }

  public updateEmail(newEmail: string) {
    this.validateEmail(newEmail);
    this.props.email = newEmail;
    this.touch();
  }

  public updateName(newName: string) {
    this.props.name = newName;
    this.touch();
  }

  public updateAvatar(newAvatar: string) {
    this.props.avatar = newAvatar;
    this.touch();
  }

  private validateEmail(email: string) {
    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}

export class UserPresenter {
  static toHttp(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
