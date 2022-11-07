import { BaseHandler } from './baseHandler'
import { Product } from '../../payment-typescript/payment'
import { data } from '../data'
import { IProduct } from '../interfaces/app-interfaces'


export class ProductHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any) {
        global.counter++

        return data.products
    }

    async post(_: any, { nameArg, priceArg }: { nameArg: string, priceArg: number }) {
        global.counter++

        let newProduct: IProduct = new Product(nameArg, priceArg)
        data.products.push(newProduct)

        return data.products
    }



    async delete(_: any, { nameArg }: { nameArg: string }) {
        global.counter++

        let productIndex = data.products.findIndex((product: IProduct) => product.name === nameArg)
        if (productIndex == -1) { throw new Error('Product not found') }
        data.products.splice(productIndex, 1)

        return data.products
    }

    async patch(_: any, { nameArg, priceArg }: { nameArg: string, priceArg: number }) {
        global.counter++

        let productIndex = data.products.findIndex((product: IProduct) => product.name === nameArg)
        if (productIndex == -1) { throw new Error('Product not found') }
        data.products[productIndex].price = priceArg

        return data.products
    }
}
