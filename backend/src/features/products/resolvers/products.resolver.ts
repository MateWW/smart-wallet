import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ReqUser } from 'common/auth/decoratos/ReqUser.decorator';
import { GqlAuthGuard } from 'common/auth/guard/gqlAuth.guard';
import { AddProductInput, Product, User } from 'graphqlDefs';

import { ProductsService } from '../service/products.service';

@Resolver('Product')
export class ProductsResolver {
    constructor(private service: ProductsService) {}

    @UseGuards(GqlAuthGuard)
    @Query('getProducts')
    public getProducts(@ReqUser() { id }: User): Promise<Product[]> {
        return this.service.getProducts(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation('addProduct')
    public async addProduct(@ReqUser() { id }: User, @Args('product') product: AddProductInput): Promise<Product> {
        return this.service.addProduct(product, id);
    }
}
