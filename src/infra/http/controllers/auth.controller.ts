import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { VerifyCustomerEmailUseCase } from '@/application/use-cases/auth/verify-customer-email';
import { VerifyCustomerAuthCodeUseCase } from '@/application/use-cases/auth/verify-customer-otp';

import { CustomerViewModel } from '../view-model/customer-view-model';
import { Public } from '@/infra/shared/decorators/public.decorator';

import { VerifyCustomerEmailBody } from '../dto/verify-customer-email-body';
import { VerifyOtpBody } from '../dto/verify-customer-otp-body';

@Controller('auth')
export class AuthController {
  constructor(
    private verifyUser: VerifyCustomerEmailUseCase,
    private verifyOtp: VerifyCustomerAuthCodeUseCase,
  ) {}

  @Public()
  @Post('/verify-email')
  @HttpCode(200)
  async verifyEmail(@Body() body: VerifyCustomerEmailBody) {
    const customer = await this.verifyUser.execute(body);

    return {
      statusCode: 200,
      data: CustomerViewModel.toHttp(customer),
    };
  }

  @Public()
  @Post('/verify-otp')
  async verifyUserOtp(@Body() body: VerifyOtpBody) {
    const { code, email } = body;

    const { customer, accessToken } = await this.verifyOtp.execute({
      code,
      email,
    });

    return {
      statusCode: 200,
      message: 'Authorized',
      data: {
        customer: CustomerViewModel.toHttp(customer),
        accessToken: accessToken,
      },
    };
  }
}
