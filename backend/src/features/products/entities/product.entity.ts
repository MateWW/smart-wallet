import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Repository } from 'typeorm';

import { CompanyEntity } from 'features/companies/entities/company.entity';
import { deserializeUser, UserEntity } from 'features/user/entities/user.entity';
import { Product } from 'graphqlDefs';

export type ProductRepository = Repository<ProductEntity>;

@Entity()
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => UserEntity, ({ id }) => id)
    public user: UserEntity;

    @Column()
    public name: string;

    @Column({ type: 'money' })
    public price: number;

    @ManyToOne(() => CompanyEntity, ({ id }) => id)
    public company: CompanyEntity;
}

export function deserializeProduct(product: ProductEntity | null): Product | null {
    return product
        ? {
              ...product,
              user: deserializeUser(product.user),
          }
        : null;
}
