import { IsNotEmpty } from 'class-validator';

export class ReadNotificationQuery {
  @IsNotEmpty()
  notificationId: string;
}
