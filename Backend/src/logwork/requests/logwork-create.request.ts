import { IsNotEmpty } from 'class-validator';
import {
  IsAfterDate,
  IsAfterStartDate,
  IsSessionDay,
  IsValidFormatDateYyyyMmDd,
} from 'src/@core/custom-validator';

export class CreateLogworkDto {
  taskId: number;

  @IsNotEmpty({ message: 'Start Date không được trống' })
  @IsValidFormatDateYyyyMmDd({ message: 'Start Date sai format. YYYY/MM/DD' })
  @IsAfterDate({ message: 'Start Date không được chọn ngày tương lai' })
  startDate: Date;

  @IsNotEmpty({ message: 'Start Session không được trống' })
  @IsSessionDay({
    message: 'Session Day phải là 1 (Buổi sáng) hoặc 2 (Buổi chiều)',
  })
  startSession: number;

  @IsNotEmpty({ message: 'End Date không được trống' })
  @IsValidFormatDateYyyyMmDd({ message: 'End Date sai format. YYYY/MM/DD' })
  @IsAfterDate({ message: 'End Date không được chọn ngày tương lai' })
  @IsAfterStartDate('startDate', {
    message: 'End Date không được trước Start Date',
  })
  endDate: Date;

  @IsNotEmpty({ message: 'End Session không được trống' })
  @IsSessionDay({
    message: 'Session Day phải là 1 (Buổi sáng) hoặc 2 (Buổi chiều)',
  })
  endSession: number;

  @IsNotEmpty({ message: 'Logwork không được trống' })
  logWork: number;
}
