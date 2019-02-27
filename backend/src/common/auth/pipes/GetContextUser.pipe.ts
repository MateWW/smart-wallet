import { PipeTransform } from '@nestjs/common';

import { User } from 'graphqlDefs';

export const GetContextUserPipe: PipeTransform<any, User> = {
    transform({ user }): User {
        return user || null;
    },
};
