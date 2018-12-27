import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'features/user/service/user.service';
import { Register } from 'graphqlDefs';

import { JwtPayload, initialUser } from '../models/JwtPayload';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

    async signIn(): Promise<string> {
        // In the real-world app you shouldn't expose this method publicly
        return this.jwtService.sign(initialUser);
    }

    async register(registerData: Register): Promise<string> {
        this.usersService.register(registerData);
        return this.jwtService.sign(initialUser);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        // console.log(payload);
        return await this.usersService.checkCredentials(payload);
    }
}
