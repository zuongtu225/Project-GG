import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateNotificationUserTable1700643813772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_user',
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
            name: 'notification_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'is_seen',
            type: 'bit',
            isNullable: false,
            default: 0,
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
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'notification_user',
      new TableForeignKey({
        columnNames: ['notification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'notification',
        name: 'FK_notification_user_notification_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'notification_user',
      'FK_notification_user_notification_id',
    );

    await queryRunner.dropTable('notification_user');
  }
}
