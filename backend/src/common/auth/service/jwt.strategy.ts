import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { jwtSecret } from 'env';
import { User } from 'graphqlDefs';
import { Unauthorized } from 'common/errorHandler/models/common.errors';

import { JwtPayload } from '../models/JwtPayload';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new Unauthorized();
        }
        return user;
    }
}
