import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BillEntity } from './entities/bill.entity';
import { BillResolver } from './resolvers/bill.resolver';
import { BillsService } from './service/bills.service';

@Module({
    imports: [TypeOrmModule.forFeature([BillEntity])],
    providers: [BillResolver, BillsService],
})
export class BillsModule {}
