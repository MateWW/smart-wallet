import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'graphqlDefs';

import { deserializeUser, UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userModel: Repository<UserEntity>) {}

    public async createUser(userData: Partial<UserEntity>): Promise<User | null> {
        const user = await this.userModel.create(userData).save();
        return this.mapIfExists(user);
    }

    public async isUserExist({ email }: User): Promise<boolean> {
        const userEntity = await this.getUserByEmail(email);
        return !!userEntity;
    }

    public getFullUser(email: string): Promise<UserEntity | null> {
        return this.userModel.findOne({ email });
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email });
        return this.mapIfExists(user);
    }

    public async getUserById(id: string): Promise<User | null> {
        const user = await this.userModel.findOne({ id });
        return this.mapIfExists(user);
    }

    private mapIfExists(user: UserEntity): User | null {
        return user ? deserializeUser(user) : null;
    }
}
