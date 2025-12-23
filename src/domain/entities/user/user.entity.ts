import { MakeOptional } from '@/helpers/make-optional';
import { ulid } from 'ulidx';
import { Otp } from './user-otp.entity';

export interface UserProps {
  id: string;
  email: string;
  otp?: Otp | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserProps;

  constructor(
    props: MakeOptional<UserProps, 'id' | 'createdAt' | 'updatedAt' | 'otp'>,
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

  public get otp(): Otp | null | undefined {
    return this.props.otp;
  }

  private validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      throw new Error('Email Inválido');
    }
  }

  public assignOtp(code: string) {
    this.props.otp = new Otp({ code });
    this.props.updatedAt = new Date();
  }

  public authenticate(codeAttempt: string): boolean {
    if (!this.props.otp) return false;
    if (this.props.otp.code !== codeAttempt) return false;
    if (!this.props.otp.isValid()) return false;

    this.props.otp = null;
    return true;
  }
}
