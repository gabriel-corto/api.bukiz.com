export interface ContentProps {
  value: string;
}

export class Content {
  private readonly content: ContentProps;

  constructor(newValue: string) {
    const isLengthValid = this.validateContentLength(newValue);
    if (!isLengthValid) {
      throw new Error(
        'Conteúdo deve ter no mínimo 5 caracteres e no máximo 240!',
      );
    }

    this.content = {
      value: newValue,
    };
  }

  get value(): string {
    return this.content.value;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
