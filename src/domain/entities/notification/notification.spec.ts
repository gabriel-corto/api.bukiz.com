import { Content } from './content.entity';
import { Notification } from './notification.entity';

describe('Notification Entity', () => {
  it('Should generate a valid ID and createdAt date', () => {
    const notification = Notification.create({
      content: new Content('Conta criada com sucesso!'),
      recipientId: crypto.randomUUID(),
    });

    expect(notification.id).toBeDefined();
    expect(typeof notification.id).toBe('string');

    expect(notification.createdAt).toBeInstanceOf(Date);
    expect(notification.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('should not be able to create a notification with less than 5 characters', () => {
    expect(() => {
      Notification.create({
        content: new Content('Buki'),
        recipientId: crypto.randomUUID(),
      });
    }).toThrow();
  });

  it('should not be able to create a notification with more than 240 characters', () => {
    expect(() => {
      Notification.create({
        content: new Content('Conta criada com sucesso!'.repeat(241)),
        recipientId: crypto.randomUUID(),
      });
    }).toThrow();
  });

  it('should mark notification as read', () => {
    const notification = Notification.create({
      content: new Content('Conta criada com sucesso!'),
      recipientId: crypto.randomUUID(),
    });

    notification.read();
    expect(notification.hasRead).toEqual(true);
    expect(notification.readAt).toBeInstanceOf(Date);
  });
});
