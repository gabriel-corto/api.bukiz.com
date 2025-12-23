import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyCostumerEmailDto {
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;
}
