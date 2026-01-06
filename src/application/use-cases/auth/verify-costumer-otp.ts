import { AuthTokenPayload } from '@/types/api';

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CostumersRepository } from '@/domain/repositories/costumers.repository';
import { VerifyOtpBody } from '@/infra/http/dto/verify-costumer-otp-body';

@Injectable()
export class VerifyCostumerAuthCodeUseCase {
  constructor(
    private costumersRepository: CostumersRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: VerifyOtpBody) {
    const { email, code } = data;

    const costumer = await this.costumersRepository.findByEmail(email);
    if (!costumer) throw new NotFoundException('Cliente não encontrado!');

    const isValid = costumer.authenticate(code);
    if (!isValid)
      throw new BadRequestException('Código OTP Inválido ou Expirado');

    await this.costumersRepository.save(costumer);

    const tokenPayload: AuthTokenPayload = {
      sub: costumer.id,
      email: costumer.email,
    };

    return {
      costumer,
      accessToken: await this.jwtService.signAsync(tokenPayload),
    };
  }
}
