export interface NewLogwork {
  taskId: number;
  startDate: Date;
  startSession: number;
  endDate: Date;
  endSession: number;
  logWork: number;
  isDeleted?: boolean;
}
