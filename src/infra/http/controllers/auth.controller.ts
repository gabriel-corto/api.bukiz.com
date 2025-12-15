import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { VerifyUserDto } from '@/infra/http/dto/verify-user.dto';
import { VerifyUserUseCase } from '@/application/use-cases/verify-user';
import { UserPresenter } from '@/domain/entities/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private verifyUser: VerifyUserUseCase) {}

  @Post('/verify')
  @HttpCode(200)
  async verify(@Body() body: VerifyUserDto) {
    const user = await this.verifyUser.execute(body);

    return {
      statusCode: 200,
      message: 'AUTHORIZED',
      data: UserPresenter.toHttp(user),
    };
  }
}
