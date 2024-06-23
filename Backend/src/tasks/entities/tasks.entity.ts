import { Logwork } from 'src/logwork/entities/logwork.entity';
import { TaskList } from 'src/task-list/entities/task-list.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'task_name', length: 30, nullable: false })
  taskName: string;

  @Column({
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

  @OneToMany(() => TaskList, (task_list) => task_list.task)
  task_list: TaskList[];

  @OneToMany(() => Logwork, (logwork) => logwork.task)
  logwork: Logwork[];
}
