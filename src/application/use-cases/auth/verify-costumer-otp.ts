import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CostumersRepository } from '@/domain/repositories/costumers.repository';
import { VerifyOtpBody } from '@/infra/http/dto/verify-costumer-otp-body';

@Injectable()
export class VerifyCostumerAuthCodeUseCase {
  constructor(private costumersRepository: CostumersRepository) {}

  async execute({ code, email }: VerifyOtpBody) {
    const costumer = await this.costumersRepository.findByEmail(email);
    if (!costumer) throw new NotFoundException('Cliente não encontrado!');

    const isValid = costumer.authenticate(code);
    if (!isValid)
      throw new BadRequestException('Código OTP Inválido ou Expirado');

    await this.costumersRepository.save(costumer);

    return costumer;
  }
}
