import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createChoiceField } from 'common/helpers/createChoiceField';
import { ChoiceField } from 'graphqlDefs';

import { BillEntity } from '../entities/bill.entity';
import { getReadableBillType } from '../enums/billType.enum';

@Injectable()
export class BillsService {
    constructor(
        @InjectRepository(BillEntity)
        private readonly billEntity: Repository<BillEntity>
    ) {}

    getBillTypeChoiceFields(index: number = 0): ChoiceField[] {
        const name = getReadableBillType(index);
        if (name === 'unrecoginized') {
            return [];
        }

        const choiceField = createChoiceField(index, name);
        return [choiceField, ...this.getBillTypeChoiceFields(index + 1)];
    }
}
