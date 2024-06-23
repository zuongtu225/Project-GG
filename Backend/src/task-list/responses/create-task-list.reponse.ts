import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskListResponse {
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  taskId: number;
  @ApiProperty({ example: '30/12/2023' })
  dateStart: Date;
  @ApiProperty()
  sessionStart: number;
  @ApiProperty({ example: '30/12/2023' })
  dateEnd: Date;
  @ApiProperty()
  sessionEnd: number;
  @ApiProperty()
  workDay: number;
  sort: number;
}
