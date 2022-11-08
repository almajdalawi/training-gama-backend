import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { data } from '../data'
import { IUser, IProduct, IBank } from '../shared/interfaces'



export class PurchaseHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, productName, type }: { username: string, productName: string, type: string }): Promise<IBank> {
        let theUser: IUser = data.users.find((user: IUser) => user.name == username)
        if (!theUser) { throw new GraphQLError('User not found') }
        let theProduct: IProduct = data.products.find((product: IProduct) => product.name == productName)
        if (!theProduct) { throw new GraphQLError('Product not found') }

        if (type != 'cash' && type != 'credit') { throw new GraphQLError('Invalid payment type') }

        if (type == 'cash' && theProduct.price <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= theProduct.price }
        else if (type == 'credit' && theProduct.price <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= theProduct.price }
        else { throw new GraphQLError('Insuficient money') }

        return theUser.bankAccount
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
