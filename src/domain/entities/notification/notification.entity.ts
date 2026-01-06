import { ulid } from 'ulidx';
import { Content } from './content.entity';
import { MakeOptional } from '@/helpers/make-optional';

export interface NotificationProps {
  id: string;
  content: Content;
  hasRead: boolean;
  createdAt: Date;
  readAt?: Date | null;
  recipientId: string;
}

export class Notification {
  private props: NotificationProps;

  private constructor(props: NotificationProps) {
    this.props = props;
  }

  public static create(
    props: MakeOptional<
      NotificationProps,
      'id' | 'createdAt' | 'hasRead' | 'readAt'
    >,
  ): Notification {
    return new Notification({
      ...props,
      id: props.id ?? ulid(),
      hasRead: false,
      readAt: null,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  public static restore(props: NotificationProps): Notification {
    return new Notification(props);
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
