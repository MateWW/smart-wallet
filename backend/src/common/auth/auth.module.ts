import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtSecret } from 'env';
import { UserModule } from 'features/user/user.module';

import { GqlAuthGuard } from './guard/gqlAuth.guard';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './service/jwt.strategy';
import { RegisterValidationPipe } from './validator/register.validator';
import { SignInValidatorPipe } from './validator/signIn.validator';

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
    providers: [AuthResolver, AuthService, JwtStrategy, GqlAuthGuard, RegisterValidationPipe, SignInValidatorPipe],
})
export class AuthModule {}
