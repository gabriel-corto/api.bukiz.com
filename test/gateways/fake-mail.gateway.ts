import { MailGateway, SendMailDto } from '@/domain/gateways/mail.gateway';

export class FakeMailService implements MailGateway {
  async send(data: SendMailDto): Promise<void> {
    await Promise.resolve();
    console.log('Email enaviado para: ', data.to);
  }
}
