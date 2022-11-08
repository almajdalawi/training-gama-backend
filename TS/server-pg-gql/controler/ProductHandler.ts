import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { data } from '../data'
import { IProduct } from '../shared/interfaces'
import { Product } from '../../payment-typescript/payment'


export class ProductHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any): Promise<IProduct[]> {
        return data.products
    }

    async post(_: any, { name, price }: { name: string, price: number }): Promise<IProduct[]> {
        let newProduct: IProduct = new Product(name, price)
        data.products.push(newProduct)

        return data.products
    }

    async delete(_: any, { name }: { name: string }): Promise<IProduct[]> {
        let productIndex = data.products.findIndex((product: IProduct) => product.name === name)
        if (productIndex == -1) { throw new GraphQLError('Product not found') }
        data.products.splice(productIndex, 1)

        return data.products
    }

    async patch(_: any, { name, price }: { name: string, price: number }): Promise<IProduct[]> {
        let productIndex = data.products.findIndex((product: IProduct) => product.name === name)
        if (productIndex == -1) { throw new GraphQLError('Product not found') }
        data.products[productIndex].price = price

        return data.products
    }
}
