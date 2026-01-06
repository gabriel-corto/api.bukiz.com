import { MakeOptional } from '@/helpers/make-optional';
import { add } from 'date-fns';

export interface OtpProps {
  code: string;
  expiresIn: Date;
}

export class Otp {
  public readonly props: OtpProps;

  constructor(props: MakeOptional<OtpProps, 'expiresIn'>) {
    if (!this.validateOtpCodeLenght(props.code)) {
      throw new Error('O OTP deve ter exatamente 5 caracteres.');
    }

    this.props = {
      code: props.code,
      expiresIn: props.expiresIn ?? this.addOtpExpirationTime(new Date()),
    };
  }

  get code(): string {
    return this.props.code;
  }

  get expiresIn(): Date {
    return this.props.expiresIn;
  }

  public isValid(): boolean {
    const currentDate = new Date();
    return currentDate < this.props.expiresIn;
  }

  private validateOtpCodeLenght(code: string): boolean {
    return code.length === 5;
  }

  private addOtpExpirationTime(date: Date): Date {
    return add(date, {
      minutes: 2,
    });
  }
}
