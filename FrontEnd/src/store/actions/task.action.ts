import { PayloadActionCreator, createAction } from '@reduxjs/toolkit';
import { GetTaskResponse } from '../../apis/task/response/get-task.response';

export const getTaskListAction: PayloadActionCreator<GetTaskResponse[]> = createAction('GET_TASK_LIST');
