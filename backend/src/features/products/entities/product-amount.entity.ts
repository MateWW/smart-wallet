import { omit } from 'lodash';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BillEntity, deserializeBill } from 'features/bills/entities/bill.entity';
import { ProductsAmount } from 'graphqlDefs';

import { deserializeProduct, ProductEntity } from './product.entity';

@Entity()
export class ProductsAmountEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'real' })
    public amount: number;

    @ManyToOne(() => ProductEntity, ({ id }) => id)
    public product: ProductEntity;

    @ManyToOne(() => BillEntity, ({ id }) => id)
    public parentBill: BillEntity;
}

export function deserializeProductsAmount(productsAmount: ProductsAmountEntity | null): ProductsAmount | null {
    return productsAmount
        ? {
              ...omit(productsAmount, ['product', 'parentBill']),
              product: deserializeProduct(productsAmount.product),
          }
        : null;
}
