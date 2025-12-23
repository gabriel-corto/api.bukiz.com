import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersRepository } from '@/domain/repositories/users.repository';
import { VerifyOtpBody } from '@/infra/http/dto/verify-otp-body';

@Injectable()
export class VerifyOtpUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ code, email }: VerifyOtpBody) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado!');

    const isValid = user.authenticate(code);
    if (!isValid) throw new BadRequestException('OTP Inválido ou Expirado');

    await this.usersRepository.save(user);

    return user;
  }
}
