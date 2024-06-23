export class SearchTask {
  id: number;
  taskName: string;
}
export class SearchTaskResponse {
  data: SearchTask[];
  constructor(data: SearchTask[]) {
    this.data = data;
  }
}
