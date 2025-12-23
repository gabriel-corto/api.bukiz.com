import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { User } from '@/domain/entities/user/user.entity';
import { MailGateway } from '@/domain/gateways/mail.gateway';
import { UsersRepository } from '@/domain/repositories/users.repository';

import { VerifyUserDto } from '@/application/dto/verify-user.dto';

import { getLoginOtpTemplate } from '@/infra/mail/templates/login-otp.template';
import { generatedOtp } from '@/helpers/otp-generator';

@Injectable()
export class VerifyUserUseCase {
  constructor(
    private mailService: MailGateway,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ email }: VerifyUserDto): Promise<User> {
    const code = generatedOtp;

    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
      user = new User({ email });
      user.assignOtp(code);

      await this.usersRepository.create(user);
    } else {
      user.assignOtp(code);
      await this.usersRepository.save(user);
    }

    try {
      await this.mailService.send({
        to: user.email,
        subject: 'Verifique seu acesso à Bukiz',
        content: getLoginOtpTemplate(code),
      });
    } catch {
      throw new ServiceUnavailableException('Serviço de e-mail indisponível!');
    }

    return user;
  }
}
