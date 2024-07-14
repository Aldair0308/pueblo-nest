// database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'monorail.proxy.rlwy.net', // Usar variable de entorno o un valor por defecto
  port: parseInt(process.env.DB_PORT, 10) || 58781, // Usar variable de entorno o un valor por defecto
  username: process.env.DB_USERNAME || 'root', // Usar variable de entorno o un valor por defecto
  password: process.env.DB_PASSWORD || 'btFtQPcgTDtngJwgZNbHOvgdUzNXBsXJ', // Usar variable de entorno o un valor por defecto
  database: process.env.DB_DATABASE || 'railway', // Usar variable de entorno o un valor por defecto
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo en desarrollo, sincroniza automáticamente el esquema de la base de datos
};

export default config;
