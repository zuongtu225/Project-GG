import { AxiosResponse } from 'axios';
import axiosInstance from '../base.api';
import { NotificationRequest } from './requests/notification.request';
import { NotificationDetailType, NotificationResponse } from './responses/notification.response';
import { UpdateNotificationRequest } from './requests/update-notification.request';
import axios from 'axios';
import { CreateNotificationRequest } from './requests/create-notification-request';

const getNotificationAPI = async (
  id: number,
  notificationQuery?: NotificationRequest,
): Promise<{ data: NotificationResponse[] }> => {
  return axiosInstance
    .get(`/notifications/users/${id}`, { params: notificationQuery })
    .then((response: AxiosResponse<{ data: NotificationResponse[] }>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getDetailNotificationAPI = async (id: number): Promise<NotificationDetailType> => {
  return axiosInstance
    .get(`/notifications/${id}`)
    .then((response: AxiosResponse<NotificationDetailType>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const updateNotificationAPI = async (
  id: number,
  requestBody: UpdateNotificationRequest,
): Promise<NotificationResponse> => {
  return axiosInstance
    .put(`/notifications/update/${id}`, requestBody)
    .then((response: AxiosResponse<NotificationResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const addNotification = async (data: CreateNotificationRequest) => {
  return await axios
    .post(`${import.meta.env.VITE_BACK_END}/notifications/`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export { getNotificationAPI, updateNotificationAPI, addNotification, getDetailNotificationAPI };
