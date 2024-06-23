export interface GetTaskListResponse {
  userId: number;
  id: number;
  task: { id: number; taskName: string };
  dateStart: string;
  sessionStart: number;
  dateEnd: string;
  sessionEnd: number;
  workDay: number;
}
