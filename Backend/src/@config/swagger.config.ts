import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Rikkei')
  .setDescription('The tasks list API description')
  .setVersion('1.0')
  .addTag('task-list')
  .build();
