import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import notificationReducer from './reducers/notification.reducer';
import taskListReducer from './reducers/task-list.reduder';
import authReducer from './reducers/auth.reduder';
import nameTaskSlice from './reducers/name-task.slice';
import logworkReducer from './reducers/logwork.reduder';
import taskReducer from './reducers/task.reducer';

const rootReducer = combineReducers({
  authReducer,
  taskListReducer,
  nameTask: nameTaskSlice,
  notificationReducer: notificationReducer,
  logworkReducer,
  taskReducer: taskReducer,
});

const store: ToolkitStore = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
