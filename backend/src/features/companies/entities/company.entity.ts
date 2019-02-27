import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Company } from 'graphqlDefs';

@Entity()
export class CompanyEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    public nip: string;

    @Column()
    public name: string;
}

export function deserializeCompany(company: CompanyEntity | null): Company | null {
    return company
        ? {
              ...company,
          }
        : null;
}
