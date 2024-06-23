import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';
import { createTaskRequest } from '../requests/create-task.request';
import { Task } from '../entities/tasks.entity';
import { createTaskResponse } from '../responses/create-task.response';
import { SearchTaskRequest } from '../requests/search-task.request';
import { SearchTaskResponse } from '../responses/search-task.response';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(body: createTaskRequest): Promise<createTaskResponse> {
    const existingTask = await this.taskRepository.findOne({
      where: { taskName: body.taskName },
    });
    if (existingTask) {
      throw new ConflictException();
    }
    const newTask = this.taskRepository.create({ taskName: body.taskName });
    await this.taskRepository.save(newTask);
    throw new HttpException({ taskName: body.taskName }, HttpStatus.CREATED);
  }
  async getTask(query: SearchTaskRequest): Promise<SearchTaskResponse> {
    const data = await this.taskRepository.find({
      where: query.taskname && {
        taskName: Like(`%${query.taskname}%`),
      },
    });
    return new SearchTaskResponse(data);
  }
}
