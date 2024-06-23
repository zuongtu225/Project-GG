import { LogworkType } from '../../../types/logwork/logwork.type';

export interface Logwork {
  id: number;
  taskId: number;
  startDate: string;
  startSession: number;
  endDate: string;
  endSession: number;
  logWork: number;
  isDeleted: boolean;
  task: {
    id: number;
    taskName: string;
  };
}

export type LogworkEditModalProps = {
  id: number;
  data: LogworkType | undefined;
};

export type logworkAddProps = {
  id: number;
  taskName: string;
};

export type LogwordDeleteModalProps = {
  idDelete: number;
  status: (isUpdate: boolean) => void;
  update: boolean;
};
