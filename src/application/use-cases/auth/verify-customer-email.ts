import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { Customer } from '@/domain/entities/customer/customer.entity';
import { Email } from '@/domain/entities/customer/value-objects/email';
import { MailGateway } from '@/domain/gateways/mail.gateway';
import { CustomersRepository } from '@/domain/repositories/customers.repository';

import { VerifyCustomerEmailDto } from '@/application/dto/verify-customer-email.dto';

import { renderOtpMailTemplate } from '@/infra/mail/templates/otp-mail-template';
import { generateOTP } from '@/helpers/otp-generator';

@Injectable()
export class VerifyCustomerEmailUseCase {
  constructor(
    private mailService: MailGateway,
    private customersRepository: CustomersRepository,
  ) {}

  async execute(data: VerifyCustomerEmailDto): Promise<Customer> {
    const { email } = data;

    const code = generateOTP(5, {
      useLetters: false,
      useSymbols: false,
    });

    let customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      customer = Customer.create({ email: Email.create(email) });
      customer.assignOtp(code);

      await this.customersRepository.create(customer);
    } else {
      customer.assignOtp(code);
      await this.customersRepository.save(customer);
    }

    try {
      const html = renderOtpMailTemplate(code);

      await this.mailService.send({
        to: customer.email.getValue,
        subject: 'Verifique seu acesso à Bukiz',
        content: html,
      });
    } catch {
      throw new ServiceUnavailableException('Serviço de e-mail indisponível!');
    }

    return customer;
  }
}
