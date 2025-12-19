import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { VerifyUserUseCase } from '@/application/use-cases/auth/verify-user';
import { UserViewModel } from '../view-model/user-view-model';

import { VerifyUserBody } from '../dto/verify-user-body';
import { VerifyOtpBody } from '../dto/verify-otp-body';

@Controller('auth')
export class AuthController {
  constructor(private verifyUser: VerifyUserUseCase) {}

  @Post('/credentials')
  @HttpCode(200)
  async verifyEmail(@Body() body: VerifyUserBody) {
    const user = await this.verifyUser.execute(body);

    return {
      statusCode: 200,
      message: 'AUTHORIZED',
      data: UserViewModel.toHttp(user),
    };
  }

  @Post('/verify')
  async verifyOtp(@Body() body: VerifyOtpBody) {
    console.log(body.otp);
    await Promise.resolve();
  }
}
