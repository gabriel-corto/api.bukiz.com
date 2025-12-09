import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { ValidateUserDto } from '@/application/auth/dto/validate-user.dto';
import { ValidateUserUseCase } from '@/application/auth/use-cases/validate-user.use-case';
import { UserPresenter } from '@/domain/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private validateUser: ValidateUserUseCase) {}

  @Post('')
  @HttpCode(200)
  async validate(@Body() body: ValidateUserDto) {
    const user = await this.validateUser.execute(body);

    return {
      statusCode: 200,
      message: 'AUTHORIZED',
      data: UserPresenter.toHttp(user),
    };
  }
}
