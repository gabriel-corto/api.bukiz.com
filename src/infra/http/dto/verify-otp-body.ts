import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyOtpBody {
  @ApiProperty({ example: '12345' })
  @IsNotEmpty({ message: 'Código OTP é Obrigatório!' })
  code: string;

  @ApiProperty({ example: 'your@email.com' })
  @IsEmail({}, { message: 'O e-mail é Obrigatório!' })
  email: string;
}
