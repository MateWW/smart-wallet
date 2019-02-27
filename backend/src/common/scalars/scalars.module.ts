import { Module } from '@nestjs/common';

import { DateScalar } from './definitions/date.scalar';

@Module({
    providers: [DateScalar],
    exports: [DateScalar],
})
export class ScalarsModule {}
