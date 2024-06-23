import { createAction } from '@reduxjs/toolkit';
import { PayloadActionCreator } from '@reduxjs/toolkit/src/createAction';
import { GetTaskListResponse } from '../../apis/task-list/responses/get-task-list.response';
import { TaskListType } from '../../types/task-list/task-list.type';

const getTaskListByUserLoginAction: PayloadActionCreator<GetTaskListResponse[]> = createAction('GET_TASK_LIST');
const handleEditTaskAction: PayloadActionCreator<TaskListType> = createAction('EDIT_TASK_LIST');
const addTypeTaskAction: PayloadActionCreator<string> = createAction('TYPE_ADD');
const editTypeTaskAction: PayloadActionCreator<string> = createAction('TYPE_EDIT');

export { getTaskListByUserLoginAction, addTypeTaskAction, editTypeTaskAction, handleEditTaskAction };
