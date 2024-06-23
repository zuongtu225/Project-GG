import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { LogworkType } from '../../types/logwork/logwork.type';
import { getLogWorkAction } from '../actions/logword.action';

interface LogworkState {
  logworks: LogworkType[];
}
const initialState: LogworkState = {
  logworks: [],
};
const logworkReducer: ReducerWithInitialState<LogworkState> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<LogworkState>) => {
    builder.addCase(getLogWorkAction, (state, action) => {
      state.logworks = action.payload;
    });
  },
);

export default logworkReducer;
