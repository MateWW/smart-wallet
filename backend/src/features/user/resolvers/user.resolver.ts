import { Resolver, Mutation, Args, Query, Context, Root, Parent, Info } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Register } from 'graphqlDefs';
import { GqlAuthGuard } from 'common/auth/guard/gqlAuth.guard';
import { initialUser } from 'common/auth/models/JwtPayload';

import { UserService } from '../service/user.service';

@Resolver('User')
export class UserResolver {

    constructor(private service: UserService){}

    @UseGuards(GqlAuthGuard)
    @Query('getUser')
    public getUser(@Args() item: any){
        return initialUser;
    }

    @Mutation('register')
    public async register(@Args('data') value: Register){
        console.log(value);
        return await this.service.register(value);
    }

}