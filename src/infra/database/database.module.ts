import { Module } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { CustomersRepository } from '@/domain/repositories/customers.repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaCustomersRepository } from './prisma/repositories/prisma-customers.repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';
import { BooksRepository } from '@/domain/repositories/books.repository';
import { PrismaBooksRepository } from './prisma/repositories/prisma-books.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomersRepository,
      useClass: PrismaCustomersRepository,
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
  exports: [CustomersRepository, NotificationRepository, BooksRepository],
})
export class DatabaseModule {}
