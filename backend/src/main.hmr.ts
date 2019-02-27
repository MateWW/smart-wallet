import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

    if (module.hot) {
        const connection = getConnection();
        if (connection.isConnected) {
            await connection.close();
        }

        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
