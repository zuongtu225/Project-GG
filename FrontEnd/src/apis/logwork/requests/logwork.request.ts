export interface LogWorkRequest {
  id: number;
  startDate: string | null;
  endDate: string | null;
  logWork: number | null;
  startSession: number | null;
  endSession: number | null;
}

export interface dataLogWorkRequest {
  startDate: string | null;
  endDate: string | null;
  logWork: number | null;
  startSession: number | null;
  endSession: number | null;
}

export interface itemLogWorkRequest {
  id?: number;
  startDate?: string | null;
  endDate?: string | null;
}
