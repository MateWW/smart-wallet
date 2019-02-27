import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from 'graphqlDefs';
import { GqlAuthGuard } from 'common/auth/guard/gqlAuth.guard';
import { NotFound } from 'common/errorHandler/models/common.errors';

import { UserService } from '../service/user.service';
import { UserEntity, deserializeUser } from '../entities/user.entity';

@Resolver('User')
export class UserResolver {
    constructor(private service: UserService) {}

    @UseGuards(GqlAuthGuard)
    @Query('getUser')
    public async getUser(@Args() { id }: any): Promise<User> {
        const user = await UserEntity.findOne({ id });
        if (!user) {
            throw new NotFound(`The user doesn't exists`);
        }
        return deserializeUser(user);
    }
}
