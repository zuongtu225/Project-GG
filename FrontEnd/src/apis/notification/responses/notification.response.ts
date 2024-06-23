export interface NotificationResponse {
  id: number;
  notificationId: number;
  userId: number;
  isSeen: boolean;
  createdAt: string;
  updatedAt: string;
  notification: Notification;
}

export type NotificationDetailType = {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};
export interface Notification {
  id: number;
  title: string;
  content: string;
  isSeen: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
export class NotificationModel implements Notification {
  id: number = 0;
  title: string = '';
  content: string = '';
  isSeen: boolean = false;
  startDate: string = '';
  endDate: string = '';
  createdAt: string = '';
  updatedAt: string = '';
}
