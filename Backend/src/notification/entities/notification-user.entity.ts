import { Notification } from 'src/notification/entities/notification.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from '../../@utilities/transformers/bit.transformer';

@Entity('notification_user')
export class NotificationUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false, name: 'notification_id' })
  notificationId: number;

  @Column({ type: 'int', nullable: false, name: 'user_id' })
  userId: number;

  @Column({
    type: 'bit',
    nullable: false,
    name: 'is_seen',
    transformer: new BitTransformer(),
  })
  isSeen: boolean;

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

  @ManyToOne(
    () => Notification,
    (notification: Notification) => notification.notification_users,
    {
      cascade: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'notification_id' })
  notification: Notification;
}
