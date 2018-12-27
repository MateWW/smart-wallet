import { UsePipes } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Register } from 'graphqlDefs';

import { AuthService } from '../service/auth.service';
import { RegisterPipe } from '../validator/register.validator';

@Resolver('SignIn')
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Query('signIn')
    public signIn(): Promise<string> {
        const item = this.authService.signIn();
        return item;
    }

    @UsePipes(new RegisterPipe())
    @Mutation('register')
    public register(@Args() credentials: Register): Promise<string> {
        return this.authService.register(credentials);
    }
}
