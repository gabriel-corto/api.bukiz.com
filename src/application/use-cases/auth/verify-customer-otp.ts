import { AuthTokenPayload } from '@/types/api';

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CustomersRepository } from '@/domain/repositories/customers.repository';
import { VerifyOtpBody } from '@/infra/http/dto/verify-customer-otp-body';

@Injectable()
export class VerifyCustomerAuthCodeUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: VerifyOtpBody) {
    const { email, code } = data;

    const customer = await this.customersRepository.findByEmail(email);
    if (!customer) throw new NotFoundException('Cliente não encontrado!');

    const isValid = customer.authenticate(code);
    if (!isValid)
      throw new BadRequestException('Código OTP Inválido ou Expirado');

    await this.customersRepository.save(customer);

    const tokenPayload: AuthTokenPayload = {
      sub: customer.id,
      email: customer.email.getValue,
    };

    return {
      customer,
      accessToken: await this.jwtService.signAsync(tokenPayload),
    };
  }
}
