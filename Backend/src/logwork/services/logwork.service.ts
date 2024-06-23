import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logwork } from '../entities/logwork.entity';
import { CreateLogworkDto } from '../requests/logwork-create.request';
import { NewLogwork } from '../responses/new-logwork.response';
import { UpdateLogworkRequest } from '../requests/logwork-update-request';
import { addLogworkSuccess } from 'src/@core/message';

@Injectable()
export class LogworkService {
  constructor(
    @InjectRepository(Logwork)
    private logworkRepository: Repository<Logwork>,
  ) {}

  async updateLogwork(id: number, body: UpdateLogworkRequest): Promise<void> {
    const data = await this.logworkRepository.findOne({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException();
    }
    await this.logworkRepository.update(id, body);
  }
  async deleteLogwork(id: number) {
    const data = await this.logworkRepository.findOne({
      where: { id: id },
    });
    if (!data) {
      throw new NotFoundException();
    }
    return await this.logworkRepository.delete(id);
  }
  async changeStatusLogwork(id: number) {
    const data = await this.logworkRepository.findOne({
      where: { id: id },
    });
    if (!data) {
      throw new NotFoundException();
    }

    const newIsDeletedValue = !data.isDeleted;

    return await this.logworkRepository.update(
      { id: id },
      { isDeleted: newIsDeletedValue },
    );
  }
  // Add Logwork
  async addLogWork(
    taskId: number,
    body: CreateLogworkDto[],
  ): Promise<HttpException> {
    for (const logWork of body) {
      const newLogWork: NewLogwork = {
        taskId: taskId,
        ...logWork,
      };
      await this.logworkRepository.save(newLogWork);
    }
    throw new HttpException(addLogworkSuccess, HttpStatus.OK);
  }

  // Get Detail Logwork
  async getDetailLogwork(taskId: number): Promise<Logwork[]> {
    const result = await this.logworkRepository.find({
      where: { taskId: taskId, isDeleted: false },
      relations: { task: true },
    });
    return result;
  }
}
