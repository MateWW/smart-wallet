import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CompanyEntity, deserializeCompany } from 'features/companies/entities/company.entity';
import { ProductsAmountEntity } from 'features/products/entities/product-amount.entity';

import { deserializeProductsAmount } from 'features/products/entities/product-amount.entity';
import { UserEntity } from 'features/user/entities/user.entity';
import { deserializeUser } from 'features/user/entities/user.entity';
import { Bill } from 'graphqlDefs';

import { BillStatus } from '../enums/billStatus.enum';
import { BillType } from '../enums/billType.enum';

@Entity()
export class BillEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => UserEntity, ({ id }) => id)
    public user: UserEntity;

    @Column()
    public billStatus: BillStatus;

    @Column()
    public billType: BillType;

    @Column()
    public totalPrice: number;

    @OneToMany(() => ProductsAmountEntity, ({ id }) => id)
    public products: ProductsAmountEntity[];

    @Column()
    public date: Date;

    @Column()
    public photoUrl?: string;

    @ManyToOne(() => CompanyEntity, ({ id }) => id)
    public company: CompanyEntity;

    @CreateDateColumn()
    public createAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}

export function deserializeBill(bill: BillEntity | null, ignoreProducts: boolean = false): Bill | null {
    return bill
        ? {
              ...bill,
              user: deserializeUser(bill.user),
              products: ignoreProducts ? null : bill.products.map(product => deserializeProductsAmount(product)),
              company: deserializeCompany(bill.company),
          }
        : null;
}
