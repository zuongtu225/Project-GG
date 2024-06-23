import { ApiProperty } from '@nestjs/swagger';

export class SearchTaskRequest {
  @ApiProperty()
  taskname: string;
}
