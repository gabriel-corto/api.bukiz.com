import { MailGateway, SendMailDto } from '@/domain/gateways/mail.gateway';

export class FakeMailService implements MailGateway {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async send(data: SendMailDto): Promise<void> {
    await Promise.resolve();
  }
}
