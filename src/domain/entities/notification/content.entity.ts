export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isLengthValid = this.validateContentLength(content);
    if (!isLengthValid) {
      throw new Error(
        'Conteúdo deve ter no mínimo 5 caracteres e no máximo 240!',
      );
    }

    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
