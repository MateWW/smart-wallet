import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext): any {
        const GqlContext = GqlExecutionContext.create(context);
        return GqlContext.getContext().req;
    }
}
