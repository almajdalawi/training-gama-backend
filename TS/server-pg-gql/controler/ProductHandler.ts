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
        let result: IProduct[] = []
        let allData = await db.models.product.findAll()
        for (let i = 0; i < allData.length; i++) {
            let product = allData[i].dataValues
            result.push(product)
        }
        return result
    }

    async post(_: any, { name, price }: { name: string, price: number }): Promise<IProduct[]> {
        let newProduct: Omit<IProduct, "id"> = new Product(name, price)
        db.models.product.create(newProduct)

        let allData = await db.models.product.findAll()
        let result: IProduct[] = []
        for (let i = 0; i < allData.length; i++) {
            let product = allData[i].dataValues
            result.push(product)
        }
        return result
    }

    async delete(_: any, { name }: { name: string }): Promise<IProduct[]> {
        let theProduct = await db.models.product.findOne({ where: { name: name } })

        if (!theProduct) { throw new GraphQLError('Product not found') }
        db.models.product.destroy({ where: { name: name } })

        let allData = await db.models.product.findAll()
        let result: IProduct[] = []
        for (let i = 0; i < allData.length; i++) {
            let product = allData[i].dataValues
            result.push(product)
        }
        return result
    }

    async patch(_: any, { name, price }: { name: string, price: number }): Promise<IProduct[]> {
        let theProduct = await db.models.product.findOne({ where: { name: name } })
        if (!theProduct) { throw new GraphQLError('Product not found') }
        db.models.product.update({ price: price }, { where: { name: name } })

        let allData = await db.models.product.findAll()
        let result: IProduct[] = []
        for (let i = 0; i < allData.length; i++) {
            let product = allData[i].dataValues
            result.push(product)
        }
        return result
    }


}
