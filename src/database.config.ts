import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'monorail.proxy.rlwy.net',
  port: 58781,
  username: 'root',
  password: 'btFtQPcgTDtngJwgZNbHOvgdUzNXBsXJ',
  database: 'railway',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo en desarrollo, sincroniza automáticamente el esquema de la base de datos
};

export default config;
