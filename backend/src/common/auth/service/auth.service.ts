import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { ValidationError } from 'yup';

import { validationErrorMessages } from 'common/errorHandler/models/validation.errors';
import { deserializeUser } from 'features/user/entities/user.entity';
import { UserService } from 'features/user/service/user.service';
import { RegisterData, SignInData, User } from 'graphqlDefs';

import { JwtPayload } from '../models/JwtPayload';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

    async signIn({ email, password }: SignInData): Promise<string> {
        const user = await this.usersService.getFullUser(email);
        if (!user || !(await this.comparePassword(password, user.password))) {
            throw ValidationError(validationErrorMessages.invalidLoginOrPassword(), null, '');
        }

        return this.jwtService.sign(deserializeUser(user));
    }

    async register({ password, ...rest }: RegisterData): Promise<string> {
        const encrypedPassword = await this.cryptPassword(password);
        const user = await this.usersService.createUser({ ...rest, password: encrypedPassword });

        return this.jwtService.sign(user);
    }

    validateUser({ id }: JwtPayload): Promise<User | null> {
        return this.usersService.getUserById(id);
    }

    private cryptPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            genSalt(10, (saltErr, salt) => {
                if (saltErr) return reject(saltErr);

                hash(password, salt, (hashErr, encrypedHash) => {
                    return hashErr ? reject(hashErr) : resolve(encrypedHash);
                });
            });
        });
    }

    private comparePassword(plainPass: string, encrypedHash: string): Promise<boolean> {
        return new Promise((resolve, reject) =>
            compare(plainPass, encrypedHash, (err, isPasswordMatch) => {
                return err == null ? resolve(isPasswordMatch) : reject(err);
            }),
        );
    }
}
