import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { VerifyUserUseCase } from '@/application/use-cases/auth/verify-user';
import { VerifyOtpUseCase } from '@/application/use-cases/auth/verify-otp';

import { UserViewModel } from '../view-model/user-view-model';

import { VerifyUserBody } from '../dto/verify-user-body';
import { VerifyOtpBody } from '../dto/verify-otp-body';

@Controller('auth')
export class AuthController {
  constructor(
    private verifyUser: VerifyUserUseCase,
    private verifyOtp: VerifyOtpUseCase,
  ) {}

  @Post('/verify-email')
  @HttpCode(200)
  async verifyEmail(@Body() body: VerifyUserBody) {
    const user = await this.verifyUser.execute(body);

    return {
      statusCode: 200,
      data: UserViewModel.toHttp(user),
    };
  }

  @Post('/verify-otp')
  async verifyUserOtp(@Body() body: VerifyOtpBody) {
    const { code, email } = body;
    const user = await this.verifyOtp.execute({ code, email });

    return {
      statusCode: 200,
      message: 'AUTHORIZED',
      data: UserViewModel.toHttp(user),
    };
  }
}
