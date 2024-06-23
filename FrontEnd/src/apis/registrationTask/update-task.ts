import axiosInstance from '../base.api';
import { PostRegistrationTask } from './request/registration-task.request';

const updateTaskList = async (data: PostRegistrationTask, id: number) => {
  return axiosInstance
    .put(`/task-list/update/${id}`, data)
    .then((respone) => console.log(respone))
    .catch((error) => console.log(error));
};

export { updateTaskList };
