import { Module } from '@nestjs/common';
import { AbonoService } from './abono.service';
import { AbonoController } from './abono.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abono } from './entities/abono.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abono])],
  controllers: [AbonoController],
  providers: [AbonoService],
})
export class AbonoModule {}
