export class Price {
  private readonly value: number;

  constructor(amount: number) {
    this.value = amount;
  }

  private static validate(amount: number) {
    if (amount <= 0) {
      throw new Error('O Preço não pode ser negativo, nem igual à 0!');
    }
  }

  public toString(): string {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
    }).format(this.value);
  }

  public static create(amount: number): Price {
    Price.validate(amount);
    return new Price(amount);
  }

  get amount(): number {
    return this.value;
  }
}
