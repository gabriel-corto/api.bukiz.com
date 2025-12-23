import { SendMailDto } from '@/application/dto/send-mail.dto';

export abstract class MailGateway {
  abstract send(data: SendMailDto): Promise<void>;
}
