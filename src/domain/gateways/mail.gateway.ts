export interface SendMailDto {
  to: string;
  content?: string;
  subject?: string;
}

export abstract class MailGateway {
  abstract send(data: SendMailDto): Promise<void>;
}
