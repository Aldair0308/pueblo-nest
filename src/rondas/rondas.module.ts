import { Module } from '@nestjs/common';
import { RondasService } from './rondas.service';
import { RondasController } from './rondas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ronda } from './entities/ronda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ronda])],
  controllers: [RondasController],
  providers: [RondasService],
})
export class RondasModule {}
