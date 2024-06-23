import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { taskNotFound } from 'src/@core/message';
import { Task } from 'src/tasks/entities/tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IsTaskExist implements NestMiddleware {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const getTaskId = req.params.taskId;
    const findTask = await this.taskRepository.findOne({
      where: { id: Number(getTaskId) },
    });
    if (!findTask) {
      throw new NotFoundException(taskNotFound);
    }
    next();
  }
}
