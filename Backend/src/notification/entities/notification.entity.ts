import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotificationUser } from './notification-user.entity';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50, nullable: false })
  title: string;

  @Column({ length: 200, nullable: false })
  content: string;

  @Column({ type: 'date', nullable: false, name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', nullable: false, name: 'end_date' })
  endDate: Date;

  @CreateDateColumn({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(
    () => NotificationUser,
    (notification_users: NotificationUser) => notification_users.notification,
  )
  notification_users: NotificationUser[];
}
