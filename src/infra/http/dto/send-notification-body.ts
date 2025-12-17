import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class SendNotificationBody {
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsUUID()
  @IsNotEmpty()
  recipientId: string;
}
