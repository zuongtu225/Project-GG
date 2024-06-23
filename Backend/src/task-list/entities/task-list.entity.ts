import { Task } from 'src/tasks/entities/tasks.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('task_list')
export class TaskList {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'task_id', type: 'int', nullable: false })
  taskId: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'date_start', type: 'date', nullable: false })
  dateStart: Date;

  @Column({ name: 'session_start', type: 'int', nullable: false })
  sessionStart: number;

  @Column({ name: 'date_end', type: 'date', nullable: false })
  dateEnd: Date;

  @Column({ name: 'session_end', type: 'int', nullable: false })
  sessionEnd: number;

  @Column({ name: 'sort', type: 'int', nullable: false })
  sort: number;

  @Column({ name: 'is_active', type: 'bit', nullable: false })
  isActive: boolean;

  @Column({
    name: 'work_day',
    type: 'decimal',
    precision: 5,
    scale: 1,
    nullable: false,
  })
  workDay: number;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Task, (task) => task.task_list, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: Task;
}
