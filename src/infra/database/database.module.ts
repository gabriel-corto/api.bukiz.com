import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-user.repository';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [UsersRepository, NotificationRepository],
})
export class DatabaseModule {}
