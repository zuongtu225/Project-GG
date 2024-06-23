import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { LogworkService } from '../services/logwork.service';
import { UpdateLogworkRequest } from '../requests/logwork-update-request';
import { Logwork } from '../entities/logwork.entity';
import { CreateLogworkDto } from '../requests/logwork-create.request';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Logwork')
@Controller('logwork')
export class LogworkController {
  constructor(private readonly logworkService: LogworkService) {}

  @Put('/:id')
  @ApiOperation({ summary: 'Update logwork' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công!!!' })
  @ApiResponse({ status: 400, description: 'Không tìm thấy ID!!!' })
  @ApiResponse({ status: 500, description: 'Internal server error!!!' })
  async updateLogwork(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateLogworkRequest,
  ) {
    return await this.logworkService.updateLogwork(id, body);
  }
  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete logwork' })
  @ApiResponse({ status: 204, description: 'Xóa thành công!!!' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ID!!!' })
  async deleteLogwork(@Param('id', ParseIntPipe) id: number) {
    return await this.logworkService.deleteLogwork(id);
  }

  @Put('change-status/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Change status logwork' })
  @ApiResponse({ status: 204, description: 'Xóa thành công!!!' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ID!!!' })
  async changeStatusLogwork(@Param('id', ParseIntPipe) id: number) {
    return await this.logworkService.changeStatusLogwork(id);
  }

  @Post('/:taskId')
  @ApiOperation({ summary: 'Create logwork' })
  @ApiResponse({
    status: 200,
    description: 'Tạo logwork thành công!!!',
    type: CreateLogworkDto,
  })
  @ApiResponse({ status: 400, description: 'Sai format!!!' })
  @ApiBody({ type: [CreateLogworkDto] })
  async addLogWork(
    @Param('taskId') taskId: number,
    @Body(new ParseArrayPipe({ items: CreateLogworkDto }))
    body: CreateLogworkDto[],
  ): Promise<Logwork | unknown> {
    const result: Logwork | unknown = await this.logworkService.addLogWork(
      taskId,
      body,
    );
    return result;
  }

  @Get('/detail/:taskId')
  @ApiOperation({ summary: 'Get detail logwork' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy task!!!' })
  async getDetailLogwork(
    @Param('taskId') taskId: number,
  ): Promise<Logwork | unknown> {
    const result: Logwork | unknown =
      await this.logworkService.getDetailLogwork(taskId);
    return result;
  }
}
