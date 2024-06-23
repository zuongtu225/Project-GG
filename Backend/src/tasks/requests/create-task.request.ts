import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class createTaskRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Tên công việc không được để trống' })
  @Length(1, 30, { message: 'Tên công việc phải từ 1 đến 30 ký tự' })
  taskName: string;
}
