import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseFilters,
  Query,
  Post,
} from '@nestjs/common';
import { TaskListService } from '../services/task-list.service';
import { HttpExceptionFilter } from 'src/@core/filters/http-exception.filter';
import { SortItemRequest } from '../requests/update-sort-task-list';
import { QueryGetTask } from '../requests/get-all-task-list';
import { CreateTaskListResponse } from '../responses/create-task-list.reponse';
import { CreateTaskListRequest } from '../requests/create-task-list.request';
import { GetTaskListResponse } from '../responses/get-task-list.reponse';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('task-list')
@Controller('task-list')
export class TaskListController {
  constructor(private taskListService: TaskListService) {}

  @Post()
  @ApiOperation({ summary: 'Create new tasks list' })
  @ApiCreatedResponse({
    description: 'Created tasks list',
    type: CreateTaskListResponse,
  })
  @ApiResponse({ status: 409, description: ' Tasks is already exists' })
  @ApiResponse({ status: 500, description: ' Cannnot create tasks list' })
  @ApiBody({
    description: 'Tasks array that needs to be added to the task list',
    type: [CreateTaskListRequest],
  })
  async createTaskList(@Body() body: CreateTaskListRequest[]) {
    return await this.taskListService.createTaskListService(body);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing task in tasks list' })
  @ApiResponse({ status: 404, description: 'Cannot found task list' })
  @ApiResponse({ status: 200, description: 'Update successfully' })
  async updateTaskList(
    @Body() body: CreateTaskListRequest,
    @Param('id') id: number,
  ) {
    return await this.taskListService.updateTaskListService(body, id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a task in tasks list or get task list' })
  @ApiResponse({
    status: 200,
    description: 'Get successfully tasks list',
    type: CreateTaskListResponse,
  })
  @ApiResponse({ status: 404, description: 'Cannot found tasks list' })
  @UseFilters(new HttpExceptionFilter())
  async getAllTaskList(
    @Param('id') id: number,
    @Query() query: QueryGetTask,
  ): Promise<GetTaskListResponse[]> {
    return await this.taskListService.getAllTaskListService(id, query);
  }

  @ApiOperation({ summary: 'Get a task in tasks list or get task list' })
  @ApiResponse({ status: 200, description: 'Update index of task' })
  @ApiBody({ type: SortItemRequest })
  @Put('/update-sort')
  async updateSortTaskList(@Body() body: SortItemRequest): Promise<void> {
    return await this.taskListService.updateSortTaskListService(body);
  }

  @ApiOperation({ summary: 'Soft remove task from task list' })
  @ApiResponse({ status: 200, description: 'Remove successfully task' })
  @ApiResponse({ status: 404, description: 'Cannot found task' })
  @Put('/soft-remove/:id')
  async softRemove(@Param('id') id: number): Promise<void> {
    return await this.taskListService.softRemoveSerive(id);
  }
}
