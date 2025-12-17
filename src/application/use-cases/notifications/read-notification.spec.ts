import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { ReadNotificationUseCase } from './read-notification';
import { SendNotificationUseCase } from './send-notification';

describe('Read Notification', () => {
  it('Should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );
    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationRepository,
    );

    const notification = await sendNotificationUseCase.execute({
      content: 'Conta criada com sucesso!',
      recipientId: crypto.randomUUID(),
    });

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });
    const notificationUpdated = notificationRepository.notifications[0];

    expect(notificationUpdated.readAt).toEqual(expect.any(Date));
  });
});
