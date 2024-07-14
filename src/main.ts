import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './database.config'; // Importa la configuración de la base de datos

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura TypeORM con la configuración de la base de datos
  app.use(await TypeOrmModule.forRoot(config));

  // Configurar el puerto desde la variable de entorno, si está definida
  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
