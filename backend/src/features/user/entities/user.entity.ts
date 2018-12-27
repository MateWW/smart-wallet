import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { UserRole } from '../enum/userRole.enum';

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
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
