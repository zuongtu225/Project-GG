import { AuthState } from '../../store/reducers/auth.reduder';
import { Dayjs } from 'dayjs';
interface TaskList {
  idComponent: number;
  taskId: number | undefined;
  dateStart: Dayjs | null;
  dateEnd: Dayjs | null;
  sessionStart: number;
  sessionEnd: number;
  workDay: number;
}

type  TaskName = {
  id: number;
  taskName: string;
  createdAt: string;
  updatedAt: string;
} 
interface IdPropSelectTask {
  id: number;
  taskList: TaskName[] | null;
}
interface TaskEdit {
  id: number;
  idComponent: number;
  userId: number;
  taskId: number | undefined;
  dateStart: Dayjs | null;
  dateEnd: Dayjs | null;
  sessionStart: number;
  sessionEnd: number;
  workDay: number;
}
interface State {
  authReducer: AuthState;
  nameTask: {
    value: {
      option: {
        taskName: string;
        id: number;
      };
      id: number;
    };
  };
}
interface Component {
  idComponent: number;
  taskId: number;
  sessionStart: number;
  sessionEnd: number;
  workDay: number;
}
interface ErrorTaskName {
  msg: string;
  id: number;
}
export type { TaskList, IdPropSelectTask, TaskEdit, TaskName, State, Component, ErrorTaskName };
