import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyGateway } from 'src/gateway/gateway';
import { NotificationController } from 'src/notification/controllers/notification.controller';
import { NotificationService } from 'src/notification/services/notification.service';
import { NotificationUser } from './entities/notification-user.entity';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationUser])],
  controllers: [NotificationController],
  providers: [NotificationService, Notification, NotificationUser, MyGateway],
})
export class NotificationsModule {}
