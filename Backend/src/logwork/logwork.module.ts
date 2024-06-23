import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logwork } from './entities/logwork.entity';
import { LogworkController } from './controllers/logwork.controller';
import { LogworkService } from './services/logwork.service';
import { IsTaskExist } from './middlewares/is-task-exist.middleware';
import { Task } from 'src/tasks/entities/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logwork, Task])],
  controllers: [LogworkController],
  providers: [LogworkService],
})
export class LogworkModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsTaskExist).forRoutes({
      path: `/logwork/add/:taskId`,
      method: RequestMethod.POST,
    });
    consumer.apply(IsTaskExist).forRoutes({
      path: `/logwork/detail/:taskId`,
      method: RequestMethod.GET,
    });
  }
}
