export interface TaskListType {
  id: number;
  userId: number;
  task: { id: number; taskName: string; createdAt: string; updatedAt: string };
  taskId: number;
  dateStart: string;
  sessionStart: number;
  dateEnd: string;
  sessionEnd: number;
  workDay: number;
  sort: number;
  isActive: {
    data: number[];
    type: string;
  };
}

export interface RootStateTaskList {
  taskListReducer: {
    taskList: TaskListType[];
    type: string;
    task: TaskListType;
  };
}
export interface SortItemType {
  taskDragId?: number | undefined;
  taskDropId?: number | undefined;
  sortDrag?: number | undefined;
  sortDrog?: number | undefined;
}
