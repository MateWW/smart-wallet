
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User, Register } from 'graphqlDefs';

import { initialUser } from 'common/auth/models/JwtPayload';
import { UserEntity } from '../entities/user.entity';
import { serializeRegisterForm } from '../serializer/registerForm.serializer';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userModel: Repository<UserEntity>){}

    public register(registerData: Register): Promise<UserEntity> {
        return this.userModel.create(serializeRegisterForm(registerData)).save();
    }

    public checkCredentials({email}: Partial<User>): Promise<User> {
        console.log('check validate');
        return Promise.resolve(email === initialUser.email ? initialUser : null);
        // return UserModel.findOne({email});
    }
}