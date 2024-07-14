// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = {
    type: 'mysql',
    host: process.env.DB_HOST || 'monorail.proxy.rlwy.net',
    port: parseInt(process.env.DB_PORT, 10) || 58781,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'btFtQPcgTDtngJwgZNbHOvgdUzNXBsXJ',
    database: process.env.DB_DATABASE || 'railway',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  };

  await app.use(TypeOrmModule.forRoot(config));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
