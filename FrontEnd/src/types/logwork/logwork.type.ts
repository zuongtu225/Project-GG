export interface LogworkType {
  id: number;
  taskId: number;
  startDate: string;
  endDate: string;
  startSession: number;
  endSession: number;
  logWork: string;
  isDelete: boolean;
  task: {
    id: number;
    taskName: string;
  };
}
export interface RootStateLogwork {
  logworkReducer: {
    logworks: LogworkType[];
  };
}
