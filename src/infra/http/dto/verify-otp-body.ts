import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyOtpBody {
  @ApiProperty({ example: '12345' })
  @IsNotEmpty({ message: 'OTP é Obrigatório!' })
  otp: string;
}
