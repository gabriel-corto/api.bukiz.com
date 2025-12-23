import { Module } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { CostumersRepository } from '@/domain/repositories/costumers.repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaCostumersRepository } from './prisma/repositories/prisma-costumers.repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CostumersRepository,
      useClass: PrismaCostumersRepository,
    },
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [CostumersRepository, NotificationRepository],
})
export class DatabaseModule {}
