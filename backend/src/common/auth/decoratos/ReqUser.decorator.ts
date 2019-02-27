import { PipeTransform, Type } from '@nestjs/common';
import { Context } from '@nestjs/graphql';

import { GetContextUserPipe } from '../pipes/GetContextUser.pipe';

export function ReqUser(...pipes: (Type<PipeTransform> | PipeTransform)[]): any {
    return Context('req', GetContextUserPipe, ...pipes);
}
