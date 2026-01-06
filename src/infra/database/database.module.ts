import { Module } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { CostumersRepository } from '@/domain/repositories/costumers.repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaCostumersRepository } from './prisma/repositories/prisma-costumers.repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';
import { BooksRepository } from '@/domain/repositories/books.repository';
import { PrismaBooksRepository } from './prisma/repositories/prisma-books.repository';

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
    {
      provide: BooksRepository,
      useClass: PrismaBooksRepository,
    },
  ],
  exports: [CostumersRepository, NotificationRepository, BooksRepository],
})
export class DatabaseModule {}
