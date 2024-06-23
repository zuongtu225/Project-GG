import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { ActionReducerMapBuilder, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { NotificationResponse } from '../../apis/notification/responses/notification.response';
import { getListNotificationAction } from '../actions/notification.action';

const iniState: NotificationResponse[] = [];

const notificationReducer: ReducerWithInitialState<NotificationResponse[]> = createReducer(
  iniState,
  (builder: ActionReducerMapBuilder<NotificationResponse[]>) => {
    builder.addCase(
      getListNotificationAction,
      (state: NotificationResponse[], action: PayloadAction<NotificationResponse[]>) => {
        state = action.payload;
        return state;
      },
    );
  },
);

export default notificationReducer;
