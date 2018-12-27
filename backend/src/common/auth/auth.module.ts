import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'features/user/user.module';
import { jwtSecret } from 'env';

import { AuthService } from './service/auth.service';
import { GqlAuthGuard } from './guard/gqlAuth.guard';
import { JwtStrategy } from './service/jwt.strategy';
import { AuthResolver } from './resolvers/auth.resolver';
import { RegisterPipe } from './validator/register.validator';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: jwtSecret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        UserModule,
    ],
    controllers: [],
    providers: [AuthResolver, AuthService, JwtStrategy, GqlAuthGuard, RegisterPipe],
})
export class AuthModule {}
