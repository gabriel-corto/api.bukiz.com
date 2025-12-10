import { MailGateway } from '@/domain/gateways/mail.gateway';
import { Module } from '@nestjs/common';
import { NodeMailService } from './providers/node-mail.service';

@Module({
  providers: [
    {
      provide: MailGateway,
      useClass: NodeMailService,
    },
  ],
  exports: [MailGateway],
})
export class MailModule {}
