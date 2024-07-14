import { Module } from '@nestjs/common';
import { MesasModule } from './mesas/mesas.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MesasModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'monorail.proxy.rlwy.net',
      port: 58781,
      username: 'root',
      password: 'btFtQPcgTDtngJwgZNbHOvgdUzNXBsXJ',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo, sincroniza automáticamente el esquema de la base de datos
    })

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
