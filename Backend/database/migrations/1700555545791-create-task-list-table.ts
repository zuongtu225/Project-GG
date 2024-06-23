import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTaskListTable1700555545791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task_list',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
            default: 1,
          },
          {
            name: 'task_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
          },
          {
            name: 'date_start',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'session_start',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'date_end',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'session_end',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'work_day',
            type: 'decimal',
            precision: 5,
            scale: 1,
            isNullable: false,
          },
          {
            name: 'sort',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'bit',
            isNullable: false,
            default: 1,
          },
          {
            name: 'created_at',
            type: 'DATETIME',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'DATETIME',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE task_list`);
  }
}
