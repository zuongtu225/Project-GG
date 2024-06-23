import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { createTaskRequest } from '../requests/create-task.request';
import { TasksService } from '../services/tasks.service';
import { SearchTaskRequest } from '../requests/search-task.request';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create new tasks' })
  @ApiResponse({ status: 201, description: 'Tạo công việc thành công!!!' })
  @ApiResponse({ status: 409, description: 'Công việc đã tồn tại!!!' })
  @ApiBody({ type: createTaskRequest })
  async createTask(@Body() body: createTaskRequest) {
    return await this.tasksService.createTask(body);
  }
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiQuery({ name: 'taskname', required: false })
  async getTask(@Query() query: SearchTaskRequest) {
    return await this.tasksService.getTask(query);
  }
}
