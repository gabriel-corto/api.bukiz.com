import { MailGateway, SendMailDto } from '@/domain/gateways/mail.gateway';
import nodemailer from 'nodemailer';

export class NodeMailService implements MailGateway {
  async send({ to, subject, content }: SendMailDto) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAIL_USER,
        pass: process.env.NODEMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Bukiz Plataform" <your@mail.com>',
      to,
      subject,
      html: content,
    });
  }
}
