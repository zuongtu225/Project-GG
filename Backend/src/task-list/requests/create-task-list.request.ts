import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsValidFormatDate } from 'src/@core/validators/is-valid-format-date.validator';
import { IsAfterStartDate } from 'src/@core/validators/is-after-start-date.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskListRequest {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'user_id không được để trống' })
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'task_id không được để trống' })
  taskId: number;

  @ApiProperty({ example: '30/12/2023' })
  @IsValidFormatDate({ message: 'date_start không hợp lệ, phải DD/MM/YYYY' })
  dateStart: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'session_start không được để trống' })
  sessionStart: number;

  @ApiProperty({ example: '30/12/2023' })
  @IsValidFormatDate({ message: 'date_end không hợp lệ, phải DD/MM/YYYY' })
  @IsNotEmpty({ message: 'user_id không được để trống' })
  @IsAfterStartDate('dateStart', {
    message: 'ngày bắt dầu không được sau ngày kết thúc',
  })
  dateEnd: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'session_end không được để trống' })
  sessionEnd: number;

  @ApiProperty()
  @IsNumber()
  workDay: number;
}
