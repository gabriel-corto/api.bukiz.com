import { IsNotEmpty, Length } from 'class-validator';

export class SendNotificationBody {
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  recipientId: string;
}
