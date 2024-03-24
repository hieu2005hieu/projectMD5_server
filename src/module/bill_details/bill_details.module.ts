import { Module } from '@nestjs/common';
import { BillDetailsService } from './bill_details.service';
import { BillDetailsController } from './bill_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillDetailEntity } from './entities/bill_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillDetailEntity])],
  controllers: [BillDetailsController],
  providers: [BillDetailsService],
})
export class BillDetailsModule {}
