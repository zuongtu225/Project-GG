import { ApiProperty } from '@nestjs/swagger';

export class SortItemRequest {
  @ApiProperty()
  taskDragId?: number | undefined;
  @ApiProperty()
  taskDropId?: number | undefined;
  @ApiProperty()
  sortDrag?: number | undefined;
  @ApiProperty()
  sortDrog?: number | undefined;
}
