import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationRequest {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === '1') return true;
    if (value === '0') return false;
    return value;
  })
  @ApiProperty()
  isSeen: boolean;
}
