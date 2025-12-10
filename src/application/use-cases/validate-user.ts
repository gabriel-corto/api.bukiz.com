import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { User } from '@/domain/entities/user.entity';
import { MailGateway, SendMailDto } from '@/domain/gateways/mail.gateway';
import { UsersRepository } from '@/domain/repositories/users.repository';

import { ValidateUserDto } from '../../infra/http/dto/validate-user.dto';

import { getLoginOtpTemplate } from '@/infra/mail/templates/login-otp.template';
import { generatedOtp } from '@/helpers/otp-generator';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private mail: MailGateway,
    private userRepository: UsersRepository,
  ) {}

  private async sendOtpMail({ to }: SendMailDto) {
    try {
      await this.mail.send({
        to,
        subject: 'Verifique seu acesso à Bukiz',
        content: getLoginOtpTemplate(generatedOtp),
      });
    } catch {
      throw new ServiceUnavailableException('MAIL SERVICE UNAVAILABLE!');
    }
  }

  async execute({ email }: ValidateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      await this.sendOtpMail({
        to: existingUser.email,
      });

      console.log(existingUser);
      return existingUser;
    }

    const user = new User({
      email,
    });

    const newUser = await this.userRepository.create(user);

    await this.sendOtpMail({
      to: newUser.email,
    });

    return newUser;
  }
}
