import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  IsAfterStartDate,
  IsLowerThanNow,
  IsValidFormatDate,
} from '../../@core/custom-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNotificationDTO {
  id: number;

  @ApiProperty({ example: 'Tiêu đề phải ≤ 50 ký tự' })
  @IsNotEmpty({ message: 'Tiêu đề không được trống' })
  @MaxLength(50, { message: 'Tiêu đề phải ≤ 50 ký tự' })
  title: string;

  @ApiProperty({ example: '29/12/2023' })
  @IsNotEmpty({ message: 'Start Date không được trống' })
  @IsValidFormatDate({ message: 'Sai Format Start Date, DD/MM/YYYY' })
  @IsLowerThanNow({ message: 'Không được chọn ngày quá khứ' })
  startDate: Date;

  @ApiProperty({ example: '29/12/2023' })
  @IsNotEmpty({ message: 'End Date không được trống' })
  @IsValidFormatDate({ message: 'Sai Format End Date, DD/MM/YYYY' })
  @IsLowerThanNow({ message: 'Không được chọn ngày quá khứ' })
  @IsAfterStartDate('startDate', {
    message: 'End Date không được trước Start Date',
  })
  endDate: Date;

  @ApiProperty({ example: 'Nội dung phải ≤ 200 ký tự' })
  @IsNotEmpty({ message: 'Nội dung không được trống' })
  @MaxLength(200, { message: 'Nội dung phải ≤ 200 ký tự' })
  content: string;
}
