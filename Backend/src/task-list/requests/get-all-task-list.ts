import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryGetTask {
  @ApiPropertyOptional({
    description: 'Limit to sort by',
    example: '20',
    required: true,
  })
  limit: string;
  @ApiPropertyOptional({
    description: 'Index of task in task list array',
    example: '2',
    required: true,
  })
  offset: string;
}
