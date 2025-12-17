import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { VerifyUserUseCase } from '@/application/use-cases/auth/verify-user';
import { UserPresenter } from '@/domain/entities/user/user.entity';
import { VerifyUserBody } from '../dto/verify-use-body';

@Controller('auth')
export class AuthController {
  constructor(private verifyUser: VerifyUserUseCase) {}

  @Post('/verify')
  @HttpCode(200)
  async verify(@Body() body: VerifyUserBody) {
    const user = await this.verifyUser.execute(body);

    return {
      statusCode: 200,
      message: 'AUTHORIZED',
      data: UserPresenter.toHttp(user),
    };
  }
}
