import { Module } from '@nestjs/common';

import { AuthController } from '@/infra/http/auth/auth.controller';
import { ValidateUserUseCase } from '@/application/auth/use-cases/validate-user.use-case';

import { MailGateway } from '@/domain/gateways/mail.gateway';
import { NodeMailService } from '@/infra/mail/node-mail.service';

import { UsersRepository } from '@/domain/repositories/users.repository';
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-user.repository';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    ValidateUserUseCase,
    PrismaService,
    {
      provide: MailGateway,
      useClass: NodeMailService,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class AuthModule {}
