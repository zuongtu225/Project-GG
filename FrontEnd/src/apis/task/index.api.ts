import { AxiosResponse } from 'axios';
import axiosInstance from '../base.api';
import { GetTaskResponse } from './response/get-task.response';
import { CreateTaskRequest } from './request/create-task.request';

const getTaskApi = async (): Promise<{ data: GetTaskResponse[] }> => {
  return axiosInstance
    .get('/tasks')
    .then((response: AxiosResponse<{ data: GetTaskResponse[] }>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const createTaskApi = async (body: CreateTaskRequest): Promise<GetTaskResponse[]> => {
  try {
    const response: AxiosResponse<{ data: GetTaskResponse[] }> = await axiosInstance.post('/tasks', body);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { getTaskApi, createTaskApi };
