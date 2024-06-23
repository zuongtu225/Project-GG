export class GetNotificationResponse {
  data: UserNotification[];
  constructor(data: UserNotification[]) {
    this.data = data;
  }
}

export class NotificationResponse {
  id: number;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
}

export class UserNotification {
  id: number;
  notificationId: number;
  userId: number;
  isSeen: boolean;
  notification: NotificationResponse;
}

export class QueryString {
  startDate: Date;
  endDate: Date;
}
