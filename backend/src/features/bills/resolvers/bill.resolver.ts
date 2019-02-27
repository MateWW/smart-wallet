import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'common/auth/guard/gqlAuth.guard';
import { Bill, BillInput, ChoiceField } from 'graphqlDefs';

import { getReadableBillType } from '../enums/billType.enum';
import { BillsService } from '../service/bills.service';

@Resolver('Bill')
export class BillResolver {
    constructor(private readonly service: BillsService) {}

    @Query('getBillsList')
    public getBills(): Promise<any> {
        return Promise.resolve(null);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation('createBill')
    public createBill(@Args('bill') { type, ...bill }: BillInput): Promise<Bill> {
        const products = bill.products as any;
        return Promise.resolve({
            id: 'xdddd',
            choiceField: getReadableBillType(type),
            ...bill,
            products,
            company: null,
        });
    }

    @Query('getBillTypes')
    public getBillTypes(): ChoiceField[] {
        return this.service.getBillTypeChoiceFields();
    }
}
