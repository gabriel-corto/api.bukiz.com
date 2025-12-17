import { IsNotEmpty } from 'class-validator';

export class ReadNotificationQuery {
  //@IsUUID()
  @IsNotEmpty()
  notificationId: string;
}
