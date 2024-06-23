import {
  Controller,
  Get,
  Put,
  Query,
  Param,
  ParseIntPipe,
  Body,
  Post,
} from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDTO } from '../requests/notification-create.request';
import { Notification } from 'src/notification/entities/notification.entity';
import { UpdateNotificationRequest } from '../requests/notification-update.request';
import { QueryString } from '../responses/notification.response';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Notification')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create new notification' })
  @ApiResponse({ status: 200, description: 'Tạo thông báo thành công!!!' })
  @ApiResponse({ status: 400, description: 'Bad Request!!!' })
  @ApiBody({ type: CreateNotificationDTO })
  async addNotification(
    @Body() body: CreateNotificationDTO,
  ): Promise<Notification | unknown> {
    const result: string | unknown =
      await this.notificationService.addNotification(body);
    return result;
  }

  @Get('/users/:id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiQuery({ name: 'startDate', required: false, description: '2023-12-29' })
  @ApiQuery({ name: 'endDate', required: false, description: '2023-12-29' })
  async getAllNotifications(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: QueryString,
  ) {
    return await this.notificationService.getAllNotification(id, query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get detail notification' })
  async getDetailNotifications(@Param('id', ParseIntPipe) id: number) {
    return await this.notificationService.getDetailNotifications(id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Update notification' })
  @ApiResponse({ status: 200, description: 'Cập nhật trạng thái đã xem!!!' })
  @ApiBody({
    description: 'isSeen is true, notSeen is false',
    type: UpdateNotificationRequest,
  })
  async UpdateNotification(
    @Param('id') id: number,
    @Body() body: UpdateNotificationRequest,
  ) {
    return await this.notificationService.updateNotification(id, body);
  }
}
