import { ReadNotificationDto } from '@/application/dto/read-notification.dto';
import { Notification } from '../entities/notification/notification.entity';

export abstract class NotificationRepository {
  abstract save(data: Notification): Promise<Notification>;
  abstract findById(data: ReadNotificationDto): Promise<Notification | null>;
  abstract findAll(): Promise<Notification[]>;
}
