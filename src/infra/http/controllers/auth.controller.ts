import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { VerifyCostumerEmailUseCase } from '@/application/use-cases/auth/verify-costumer-email';
import { VerifyCostumerAuthCodeUseCase } from '@/application/use-cases/auth/verify-costumer-otp';

import { CostumerViewModel } from '../view-model/costumer-view-model';
import { Public } from '@/infra/shared/decorators/public.decorator';

import { VerifyCostumerEmailBody } from '../dto/verify-costumer-email-body';
import { VerifyOtpBody } from '../dto/verify-costumer-otp-body';

@Controller('auth')
export class AuthController {
  constructor(
    private verifyUser: VerifyCostumerEmailUseCase,
    private verifyOtp: VerifyCostumerAuthCodeUseCase,
  ) {}

  @Public()
  @Post('/verify-email')
  @HttpCode(200)
  async verifyEmail(@Body() body: VerifyCostumerEmailBody) {
    const costumer = await this.verifyUser.execute(body);

    return {
      statusCode: 200,
      data: CostumerViewModel.toHttp(costumer),
    };
  }

  @Public()
  @Post('/verify-otp')
  async verifyUserOtp(@Body() body: VerifyOtpBody) {
    const { code, email } = body;

    const { costumer, accessToken } = await this.verifyOtp.execute({
      code,
      email,
    });

    return {
      statusCode: 200,
      message: 'Authorized',
      data: {
        costumer: CostumerViewModel.toHttp(costumer),
        accessToken: accessToken,
      },
    };
  }
}
