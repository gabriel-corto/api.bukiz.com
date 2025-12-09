import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateUserDto {
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;
}
