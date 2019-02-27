import { Scalar } from '@nestjs/graphql';
import { Kind, ASTNode } from 'graphql';

@Scalar('Date')
export class DateScalar {
    public description = 'Date custom scalar type';

    public parseValue(value: number): Date {
        return new Date(value);
    }

    public serialize(value: Date): number {
        return value.getTime();
    }

    public parseLiteral(ast: ASTNode): number {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null;
    }
}
