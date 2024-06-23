import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { getTaskListAction } from '../actions/task.action';
import { GetTaskResponse } from '../../apis/task/response/get-task.response';

const iniState: GetTaskResponse[] = [];

const taskReducer: ReducerWithInitialState<GetTaskResponse[]> = createReducer(
  iniState,
  (builder: ActionReducerMapBuilder<GetTaskResponse[]>) => {
    builder.addCase(getTaskListAction, (_, action) => {
      return action.payload;
    });
  },
);

export default taskReducer;
