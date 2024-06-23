import { AxiosResponse } from 'axios';
import { GetTaskResponse } from './response/get-task.response';
import axiosInstance from '../base.api';

const getTaskApi = async (): Promise<GetTaskResponse[]> => {
  return await axiosInstance
    .get(`/tasks`)
    .then((response: AxiosResponse<{data:GetTaskResponse[]}>) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getTaskApi };
