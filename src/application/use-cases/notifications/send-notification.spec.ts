import { SendNotificationUseCase } from './send-notification';
import { InMemoryNotificationRepository } from '@/infra/database/in-memory/in-memory-notification.repository';

describe('Send Notification', () => {
  const notificationRepository = new InMemoryNotificationRepository();
  const sendNotification = new SendNotificationUseCase(notificationRepository);

  it('Should be create a new notification', async () => {
    const notification = await sendNotification.execute({
      content: 'A sua conta foi criada com sucesso!',
      recipientId: crypto.randomUUID(),
    });

    expect(notification).toBeTruthy();
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
