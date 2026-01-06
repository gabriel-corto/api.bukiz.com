import { ulid } from 'ulidx';

import { MakeOptional } from '@/helpers/make-optional';
import { Otp } from './value-objects/otp';
import { Email } from './value-objects/email';

export interface CustomerProps {
  id: string;
  email: Email;
  otp?: Otp | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Customer {
  private props: CustomerProps;

  constructor(
    props: MakeOptional<
      CustomerProps,
      'id' | 'createdAt' | 'updatedAt' | 'otp'
    >,
  ) {
    this.props = {
      ...props,
      id: props.id ?? ulid(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
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

  public get email(): Email {
    return this.props.email;
  }

  public get otp(): Otp | null | undefined {
    return this.props.otp;
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
