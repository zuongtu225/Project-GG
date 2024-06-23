export type PostRegistrationTask =
  | {
      userId: number;
      taskId: number | undefined;
      dateStart: string | undefined;
      dateEnd: string | undefined;
      sessionEnd: number;
      sessionStart: number;
      workDay: number;
    }
  | null
  | undefined;
