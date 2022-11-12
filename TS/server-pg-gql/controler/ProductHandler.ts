import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IProduct } from '../shared/interfaces'
import { Product } from '../../payment-typescript/payment'


export class ProductHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any): Promise<IProduct[]> {
        return db.products.findAll()
    }

    async post(_: any, { name, price }: { name: string, price: number }): Promise<IProduct[]> {
        let newProduct: IProduct = new Product(name, price)
        db.products.create(newProduct)

        return db.products.findAll()
    }

    async delete(_: any, { name }: { name: string }): Promise<IProduct[]> {
        let productIndex = await db.products.findOne({ where: { name: name } })
        if (productIndex == -1) { throw new GraphQLError('Product not found') }
        db.products.destroy({ where: { name: name } })

        return db.products.findAll()
    }

    async patch(_: any, { name, price }: { name: string, price: number }): Promise<IProduct[]> {
        let productIndex = await db.products.findOne({ where: { name: name } })
        if (productIndex == -1) { throw new GraphQLError('Product not found') }
        db.products.update({ price: price }, { where: { name: name } })

        return db.products.findAll()
    }
}
