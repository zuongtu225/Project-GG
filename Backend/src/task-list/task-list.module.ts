import { Module } from '@nestjs/common';
import { TaskListController } from './controllers/task-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListService } from './services/task-list.service';
import { Task } from 'src/tasks/entities/tasks.entity';
import { TaskList } from './entities/task-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList, Task])],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
