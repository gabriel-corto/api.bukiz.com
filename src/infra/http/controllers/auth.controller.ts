import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { ValidateUserDto } from '@/infra/http/dto/validate-user.dto';
import { ValidateUserUseCase } from '@/application/use-cases/validate-user';
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
