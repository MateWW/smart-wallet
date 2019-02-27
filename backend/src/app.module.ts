import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { handleError } from 'common/errorHandler/index';
import { AuthModule } from 'common/auth/auth.module';
import { ScalarsModule } from 'common/scalars/scalars.module';

import { UserModule } from 'features/user/user.module';
import { CompaniesModule } from 'features/companies/companies.module';

import { AppController } from './app.controller';
import { BillsModule } from './features/bills/bills.module';
import { ProductsModule } from './features/products/products.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'wallet-database',
            port: 5432,
            username: 'wallet',
            password: 'pass',
            database: 'wallet',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        GraphQLModule.forRoot({
            context: ({ req }: any) => ({ req }),
            typePaths: ['./src/**/*.gql'],
            definitions: {
                path: join(process.cwd(), 'src/graphqlDefs.ts'),
                outputAs: 'interface',
            },
            formatError: handleError,
            debug: false,
        }),
        UserModule,
        AuthModule,
        BillsModule,
        ProductsModule,
        CompaniesModule,
        ScalarsModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
