import axiosInstance from '../base.api';
import { PostRegistrationTask } from './request/registration-task.request';

const createRegistrationTask = async (data: PostRegistrationTask[]) => {
  return axiosInstance
    .post(`/task-list`, data)
    .then((respone) => console.log(respone))
    .catch((error) => console.log(error));
};

export { createRegistrationTask };
