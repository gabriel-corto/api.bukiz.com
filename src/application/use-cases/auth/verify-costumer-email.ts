import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { Costumer } from '@/domain/entities/costumer/costumer.entity';
import { MailGateway } from '@/domain/gateways/mail.gateway';
import { CostumersRepository } from '@/domain/repositories/costumers.repository';

import { VerifyCostumerEmailDto } from '@/application/dto/verify-costumer-email.dto';

import { renderOtpMailTemplate } from '@/infra/mail/templates/otp-mail-template';
import { generateOTP } from '@/helpers/otp-generator';

@Injectable()
export class VerifyCostumerEmailUseCase {
  constructor(
    private mailService: MailGateway,
    private costumersRepository: CostumersRepository,
  ) {}

  async execute(data: VerifyCostumerEmailDto): Promise<Costumer> {
    const { email } = data;

    const code = generateOTP(5, {
      useLetters: false,
      useSymbols: false,
    });

    let costumer = await this.costumersRepository.findByEmail(email);

    if (!costumer) {
      costumer = new Costumer({ email });
      costumer.assignOtp(code);

      await this.costumersRepository.create(costumer);
    } else {
      costumer.assignOtp(code);
      await this.costumersRepository.save(costumer);
    }

    try {
      const html = renderOtpMailTemplate(code);

      await this.mailService.send({
        to: costumer.email,
        subject: 'Verifique seu acesso à Bukiz',
        content: html,
      });
    } catch {
      throw new ServiceUnavailableException('Serviço de e-mail indisponível!');
    }

    return costumer;
  }
}
