import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from '../entities/task-list.entity';
import { Connection, Repository } from 'typeorm';
import * as moment from 'moment';
import { CreateTaskListRequest } from '../requests/create-task-list.request';
import { DATE_FORMAT } from 'src/@config/formatter.config';
import { SortItemRequest } from '../requests/update-sort-task-list';
import { QueryGetTask } from '../requests/get-all-task-list';
import { GetTaskListResponse } from '../responses/get-task-list.reponse';
import { TaskListErrorMessages } from '../enums/message.enum';
@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
    private readonly connection: Connection,
  ) {}

  async getAllTaskListService(
    userId: number,
    query: QueryGetTask,
  ): Promise<GetTaskListResponse[]> {
    const findUser = await this.taskListRepository.findOneBy({ userId });
    if (!findUser) {
      throw new NotFoundException(TaskListErrorMessages.UserNotFound);
    }
    return await this.taskListRepository
      .createQueryBuilder()
      .where('TaskList.user_id = :user_id', { user_id: userId })
      .leftJoinAndSelect('TaskList.task', 'task')
      .limit(Number(query.limit))
      .offset(Number(query.offset))
      .orderBy('TaskList.sort', 'ASC')
      .getMany();
  }

  async updateSortTaskListService(body: SortItemRequest): Promise<void> {
    const findTaskDrag = await this.taskListRepository.findOneBy({
      id: body.taskDragId,
    });
    const findTaskDrop = await this.taskListRepository.findOneBy({
      id: body.taskDropId,
    });
    if (!findTaskDrag || !findTaskDrop) {
      throw new NotFoundException(TaskListErrorMessages.TaskNotFound);
    }
    if (!body.sortDrag || !body.sortDrog) {
      throw new NotFoundException(TaskListErrorMessages.SortNotFound);
    }
    await this.taskListRepository.update(body.taskDragId, {
      sort: body.sortDrog,
    });
    await this.taskListRepository.update(body.taskDropId, {
      sort: body.sortDrag,
    });
  }

  async softRemoveSerive(id: number): Promise<void> {
    const findTask = await this.taskListRepository.findOneBy({ id });
    if (!findTask) {
      throw new NotFoundException(TaskListErrorMessages.TaskNotFound);
    }
    await this.taskListRepository.update(id, {
      isActive: false,
    });
  }

  async createTaskListService(listTask: CreateTaskListRequest[]) {
    await this.connection.transaction(async (manager) => {
      for (const task of listTask) {
        const startDate = moment(task.dateStart, 'DD/MM/YYYY');
        const endDate = moment(task.dateEnd, 'DD/MM/YYYY');

        const existingTask = await manager.findOne(TaskList, {
          where: {
            userId: task.userId,
            taskId: task.taskId,
            dateStart: moment(
              startDate.format(DATE_FORMAT),
              DATE_FORMAT,
            ).toDate(),
          },
        });

        if (existingTask) {
          throw new ConflictException();
        }

        const maxId = await manager
          .createQueryBuilder(TaskList, 'taskList')
          .select('MAX(taskList.id)', 'id')
          .getRawOne();

        await manager.save(TaskList, {
          userId: Number(task.userId),
          taskId: task.taskId,
          dateStart: startDate.format(DATE_FORMAT),
          sessionStart: task.sessionStart,
          dateEnd: endDate.format(DATE_FORMAT),
          sessionEnd: task.sessionEnd,
          workDay: task.workDay,
          sort: maxId.id !== -Infinity ? maxId.id + 1 : 1,
        });
      }
    });
  }

  async updateTaskListService(listTask: CreateTaskListRequest, id: number) {
    const startDate = moment(listTask.dateStart, 'DD/MM/YYYY');
    const endDate = moment(listTask.dateEnd, 'DD/MM/YYYY');

    const notFound = await this.taskListRepository.findOneById(id);

    if (!notFound) {
      throw new NotFoundException();
    }

    await this.taskListRepository.update(
      { id: id },
      {
        userId: listTask.userId,
        taskId: listTask.taskId,
        dateStart: startDate.format(DATE_FORMAT),
        sessionStart: listTask.sessionStart,
        dateEnd: endDate.format(DATE_FORMAT),
        sessionEnd: listTask.sessionEnd,
        workDay: listTask.workDay,
      },
    );

    throw new HttpException(listTask, HttpStatus.OK);
  }
}
``;
