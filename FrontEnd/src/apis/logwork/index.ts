import axiosInstance from '../base.api';
import { AxiosResponse } from 'axios';
import { dataLogWorkRequest } from './requests/logwork.request';

export const getLogworkApi = (id: number | undefined) => {
  return axiosInstance
    .get(`/logwork/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteLogworkApi = (id: number) => {
  return axiosInstance
    .put(`/logwork/change-status/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const createLogWorkAPI = async (
  id: number,
  requestBody: dataLogWorkRequest[],
): Promise<{ data: dataLogWorkRequest[] }> => {
  return axiosInstance
    .post(`/logwork/${id}`, requestBody)
    .then((response: AxiosResponse<{ data: dataLogWorkRequest[] }>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
