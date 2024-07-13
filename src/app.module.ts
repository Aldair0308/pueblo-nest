import { Module } from '@nestjs/common';
import { MesasModule } from './mesas/mesas.module';

@Module({
  imports: [MesasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
