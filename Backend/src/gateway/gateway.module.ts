import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from 'src/notification/services/notification.service';
import { NotificationUser } from 'src/notification/entities/notification-user.entity';
import { Notification } from '../notification/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationUser])],
  providers: [MyGateway, NotificationService],
  exports: [MyGateway],
})
export class MyGatewayModule {}
