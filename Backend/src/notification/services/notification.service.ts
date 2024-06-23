import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDTO } from '../requests/notification-create.request';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SeenStatus } from '../enums/seen-status.enum';
import { MyGateway } from 'src/gateway/gateway';
import { NotificationUser } from 'src/notification/entities/notification-user.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { DATE_FORMAT, DATE_FORMAT_DEFAULT } from 'src/@core/format-date';
import { addNotificationSuccess } from 'src/@core/message';
import {
  GetNotificationResponse,
  QueryString,
} from '../responses/notification.response';
import { UpdateNotificationRequest } from '../requests/notification-update.request';
import * as moment from 'moment';

export interface User {
  id: number;
  name: string;
}

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationUser)
    private notificationUserRepository: Repository<NotificationUser>,
    private readonly myGateway: MyGateway,
  ) {}

  async getAllNotification(
    userId: number,
    query: QueryString,
  ): Promise<GetNotificationResponse> {
    const searchValue = Object.keys(query).length > 0 ? query : null;
    const notificationResponse = await this.notificationUserRepository.find({
      where: [
        {
          userId,
          notification: {
            startDate: searchValue && Between(query.startDate, query.endDate),
          },
        },
        {
          userId,
          notification: {
            endDate: searchValue && Between(query.startDate, query.endDate),
          },
        },
      ],
      order: searchValue
        ? { notification: { startDate: 'ASC' } }
        : { id: 'DESC' },
      relations: ['notification'],
    });
    return new GetNotificationResponse(notificationResponse);
  }

  async updateNotification(id: number, body: UpdateNotificationRequest) {
    await this.notificationUserRepository.update(id, body);
  }

  async getDetailNotifications(id: number) {
    return await this.notificationRepository.findOne({
      where: { id: id },
    });
  }

  async addNotification(body: CreateNotificationDTO): Promise<HttpException> {
    const { title, startDate, endDate, content } = body;
    const newNotification = {
      title: title,
      content: content,
      startDate: moment(startDate, DATE_FORMAT).format(DATE_FORMAT_DEFAULT),
      endDate: moment(endDate, DATE_FORMAT).format(DATE_FORMAT_DEFAULT),
    };
    const getNotification =
      await this.notificationRepository.save(newNotification);
    const getNotificationId = getNotification.id;
    const totalUser: User[] = [
      {
        id: 1,
        name: 'Minh',
      },
      {
        id: 2,
        name: 'Thắng',
      },
      {
        id: 3,
        name: 'Tài',
      },
    ];
    for (const user of totalUser) {
      const newNotificationUser = {
        notificationId: getNotificationId,
        userId: user.id,
        isSeen: Boolean(SeenStatus.unSeen),
      };
      await this.notificationUserRepository.save(newNotificationUser);
    }
    this.myGateway.alertNewNotification();
    throw new HttpException(addNotificationSuccess, HttpStatus.OK);
  }
}
