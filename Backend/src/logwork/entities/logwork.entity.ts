import BitTransformer from 'src/@utilities/transformers/bit.transformer';
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

@Entity('logwork')
export class Logwork {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false, name: 'task_id' })
  taskId: number;

  @Column({ type: 'date', nullable: false, name: 'start_date' })
  startDate: Date;

  @Column({ type: 'int', nullable: false, name: 'start_session' })
  startSession: number;

  @Column({ type: 'date', nullable: false, name: 'end_date' })
  endDate: Date;

  @Column({ type: 'int', nullable: false, name: 'end_session' })
  endSession: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 1,
    nullable: false,
    name: 'logwork',
  })
  logWork: number;

  @Column({
    type: 'bit',
    nullable: false,
    name: 'is_deleted',
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

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

  @ManyToOne(() => Task, (task: Task) => task.logwork, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: Task;
}
