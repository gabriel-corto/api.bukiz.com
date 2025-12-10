import { MailGateway, SendMailDto } from '@/domain/gateways/mail.gateway';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';

@Injectable()
export class SendMailUseCase {
  constructor(private mail: MailGateway) {}

  async execute(data: SendMailDto) {
    const { to, content, subject } = data;
    try {
      await this.mail.send({
        to,
        content,
        subject,
      });
    } catch {
      throw new ServiceUnavailableException('MAIL SERVICE UNAVAILABLE!');
    }
  }
}
