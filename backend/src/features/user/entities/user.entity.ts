import { pick } from 'lodash';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from 'graphqlDefs';

import { UserRole } from '../enum/userRole.enum';

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    public email: string;

    @Column()
    public password: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column({
        default: UserRole.USER,
    })
    public role: UserRole;

    @CreateDateColumn()
    public createAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}

export function deserializeUser(entity: UserEntity): User | null {
    if (!entity) {
        return null;
    }
    return pick(entity, ['id', 'email', 'firstName', 'lastName', 'role']);
}
