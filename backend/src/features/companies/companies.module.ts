import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CompanyEntity } from './entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyEntity])],
    controllers: [],
})
export class CompaniesModule {}
