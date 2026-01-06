export class Email {
  private readonly value: string;

  private constructor(email: string) {
    this.value = email;
    Object.freeze(this);
  }

  public static create(email: string): Email {
    if (!this.validate(email)) {
      throw new Error('Email Inválido');
    }

    return new Email(email);
  }

  public get getValue(): string {
    return this.value;
  }

  private static validate(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
