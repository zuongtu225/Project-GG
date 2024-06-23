export class GetTaskListResponse {
  id: number;
  userId: number;
  taskId: number;
  dateStart: Date;
  sessionStart: number;
  dateEnd: Date;
  sessionEnd: number;
  workDay: number;
  sort: number;
}
