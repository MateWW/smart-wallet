import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsAmountEntity } from './entities/product-amount.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductsService } from './service/products.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, ProductsAmountEntity])],
    controllers: [],
    providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
