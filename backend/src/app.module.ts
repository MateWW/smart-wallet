import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UserModule } from './features/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import { handleError } from './common/errorHandler/index';

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
            context: ({ req }) => ({ req }),
            typePaths: ['./src/**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphqlDefs.ts'),
                outputAs: 'interface',
            },
            formatError: handleError,
            debug: false,
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
