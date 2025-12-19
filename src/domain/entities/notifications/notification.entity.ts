import { ulid } from 'ulidx';
import { Content } from './content.entity';
import { MakeOptional } from '@/helpers/make-optional';

interface NotificationProps {
  readonly id: string;
  content: Content;
  createdAt: Date;
  recipientId: string;
  readAt?: Date | null;
  hasRead: boolean;
}

export class Notification {
  private props: NotificationProps;

  constructor(
    props: MakeOptional<NotificationProps, 'id' | 'createdAt' | 'hasRead'>,
  ) {
    this.props = {
      ...props,
      id: props.id ?? ulid(),
      hasRead: props.hasRead ?? false,
      readAt: props.readAt ?? null,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
  get id() {
    return this.props.id;
  }
  get content(): string {
    return this.props.content.value;
  }
  get hasRead(): boolean {
    return this.props.hasRead;
  }
  get recipientId(): string {
    return this.props.recipientId;
  }
  set recipientId(value: string) {
    this.props.recipientId = value;
  }
  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public read() {
    this.props.readAt = new Date();
    this.props.hasRead = true;
  }
}
