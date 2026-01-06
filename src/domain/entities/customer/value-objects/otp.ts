import { add } from 'date-fns';

export interface OtpProps {
  code: string;
  expiresIn: Date;
}

export class Otp {
  private readonly props: OtpProps;

  private constructor(props: OtpProps) {
    this.props = props;
    Object.freeze(this);
  }

  public static create(code: string): Otp {
    if (!Otp.validateOtpCodeLength(code)) {
      throw new Error('O OTP deve ter exatamente 5 caracteres.');
    }

    const expiresIn = Otp.addOtpExpirationTime(new Date());

    return new Otp({ code, expiresIn });
  }

  public static restore(props: OtpProps): Otp {
    return new Otp(props);
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

  private static validateOtpCodeLength(code: string): boolean {
    return code.length === 5;
  }

  private static addOtpExpirationTime(date: Date): Date {
    return add(date, {
      minutes: 2,
    });
  }
}
