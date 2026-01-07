import { Notification } from '@/domain/entities/notification/notification.entity';
import { Content } from '@/domain/entities/notification/content.entity';

import { InMemoryNotificationRepository } from '@/infra/database/in-memory/in-memory-notification.repository';
import { FetchCustomerNotificationsUseCase } from './fetch-customer-notifications';

import { ulid } from 'ulidx';

describe('Fetch Customer Notifications', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let fetchCustomerNotifications: FetchCustomerNotificationsUseCase;

  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    fetchCustomerNotifications = new FetchCustomerNotificationsUseCase(
      notificationRepository,
    );
  });

  const makeNotification = (recipientId: string) => {
    return Notification.create({
      content: new Content('Notification Content'),
      recipientId,
    });
  };

  it('Should be able to fetch customer notifications', async () => {
    const recipientId = ulid();
    await notificationRepository.save(makeNotification(recipientId));
    await notificationRepository.save(makeNotification(recipientId));
    await notificationRepository.save(makeNotification(ulid()));

    const notifications = await fetchCustomerNotifications.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications[0].recipientId).toBe(recipientId);
    expect(notifications[1].recipientId).toBe(recipientId);
  });
});
