import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { GetTaskListResponse } from '../../apis/task-list/responses/get-task-list.response';
import {
  addTypeTaskAction,
  editTypeTaskAction,
  getTaskListByUserLoginAction,
  handleEditTaskAction,
} from '../actions/task-list.action';
import { TaskListType } from '../../types/task-list/task-list.type';

interface TaskListState {
  taskList: GetTaskListResponse[];
  task: TaskListType;
  type: string;
}

const initialState: TaskListState = {
  taskList: [],
  task: {
    id: 0,
    userId: 0,
    taskId: 0,
    task: {
      id: 0,
      taskName: '',
      createdAt: '',
      updatedAt: '',
    },
    dateStart: '',
    sessionStart: 0,
    dateEnd: '',
    sessionEnd: 0,
    workDay: 0,
    sort: 0,
    isActive: {
      data: [],
      type: '',
    },
  },
  type: '',
};

const taskListReducer: ReducerWithInitialState<TaskListState> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<TaskListState>) => {
    builder.addCase(getTaskListByUserLoginAction, (state, action) => {
      state.taskList = action.payload;
    });
    builder.addCase(handleEditTaskAction, (state, action) => {
      state.task = action.payload;
    });
    builder.addCase(addTypeTaskAction, (state, action) => {
      state.type = action.payload;
    });
    builder.addCase(editTypeTaskAction, (state, action) => {
      state.type = action.payload;
    });
  },
);

export default taskListReducer;
