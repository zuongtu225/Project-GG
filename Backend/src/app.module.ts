import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { NotificationsModule } from './notification/notification.module';
import { MyGatewayModule } from './gateway/gateway.module';
import DatabaseModule from './@config/database.config';
import { TaskListModule } from './task-list/task-list.module';
import { MyGateway } from './gateway/gateway';
import { LogworkModule } from './logwork/logwork.module';

@Module({
  imports: [
    DatabaseModule,
    TaskListModule,
    TasksModule,
    NotificationsModule,
    MyGatewayModule,
    LogworkModule,
  ],
  controllers: [],
  providers: [MyGateway],
})
export class AppModule {}
