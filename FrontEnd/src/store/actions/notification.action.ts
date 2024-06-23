import { PayloadActionCreator, createAction } from '@reduxjs/toolkit';
import { NotificationResponse } from '../../apis/notification/responses/notification.response';

export const getListNotificationAction: PayloadActionCreator<NotificationResponse[]> =
  createAction('GET_LIST_NOTIFICATION');
export const addNotificationAction: PayloadActionCreator<NotificationResponse> = createAction('ADD_NOTIFICATION');
