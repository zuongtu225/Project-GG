import { GetTaskListResponse } from './responses/get-task-list.response';
import { SortItemType } from '../../types/task-list/task-list.type';
import axiosInstance from '../base.api';
import { AxiosResponse } from 'axios';

const getTaskListApi = (userId: number, limit: number, offset: number): Promise<GetTaskListResponse[]> => {
  return axiosInstance
    .get(`/task-list/${userId}`, {
      params: {
        limit,
        offset,
      },
    })
    .then((response: AxiosResponse<GetTaskListResponse[]>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const updateSortTaskListAPI = (newSortOder: SortItemType): Promise<GetTaskListResponse[]> => {
  return axiosInstance.put(`/task-list/update-sort`, newSortOder);
};

const removeSortTaskListAPI = (id: number): Promise<GetTaskListResponse[]> => {
  return axiosInstance.put(`/task-list/soft-remove/${id}`);
};

export { getTaskListApi, updateSortTaskListAPI, removeSortTaskListAPI };
