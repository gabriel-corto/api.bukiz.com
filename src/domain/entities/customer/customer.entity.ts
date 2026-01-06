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

  private constructor(props: CustomerProps) {
    this.props = props;
  }

  public static create(
    props: MakeOptional<
      CustomerProps,
      'id' | 'createdAt' | 'updatedAt' | 'otp'
    >,
  ): Customer {
    return new Customer({
      ...props,
      id: props.id ?? ulid(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      otp: props.otp ?? null,
    });
  }

  public static restore(props: CustomerProps): Customer {
    return new Customer(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get otp(): Otp | null | undefined {
    return this.props.otp;
  }

  public assignOtp(code: string) {
    this.props.otp = Otp.create(code);
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
