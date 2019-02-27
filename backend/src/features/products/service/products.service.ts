import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AddProductInput, Product, ProductsAmount } from 'graphqlDefs';

import { deserializeProduct, ProductEntity, ProductRepository } from '../entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(ProductEntity) private readonly products: ProductRepository) {}

    public async addProduct(product: AddProductInput, userId: string): Promise<ProductEntity> {
        const user = { id: userId };
        const company = { id: product.company };
        return await this.products.create({ ...product, company, user }).save();
    }

    public async getProducts(userId: string): Promise<Product[]> {
        const products = await this.products.find({ where: { user: { id: userId } }, relations: ['user'] });
        return products.map(product => deserializeProduct(product));
    }

    // public async addProductsAmount({product}: ProductsAmountInput): Promise<ProductsAmount> {
    //     product
    // }
}
