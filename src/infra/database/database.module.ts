import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-user.repository';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: NotificationRepository,
      useClass: InMemoryNotificationRepository,
    },
  ],
  exports: [UsersRepository, NotificationRepository],
})
export class DatabaseModule {}
