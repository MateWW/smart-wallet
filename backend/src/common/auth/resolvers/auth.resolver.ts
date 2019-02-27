import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RegisterData, SignInData } from 'graphqlDefs';

import { AuthService } from '../service/auth.service';
import { RegisterValidationPipe } from '../validator/register.validator';
import { SignInValidatorPipe } from '../validator/signIn.validator';

@Resolver('SignIn')
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @UsePipes(new SignInValidatorPipe())
    @Query('signIn')
    public signIn(@Args() credentials: SignInData): Promise<string> {
        return this.authService.signIn(credentials);
    }

    @UsePipes(new RegisterValidationPipe())
    @Mutation('register')
    public register(@Args() credentials: RegisterData): Promise<string> {
        return this.authService.register(credentials);
    }
}
