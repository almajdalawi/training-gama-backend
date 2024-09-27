import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser } from '../shared/interfaces'
import { Model } from 'sequelize';



export class PurchaseHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, productName, type }: { username: string, productName: string, type: string }): Promise<IUser> {
        let theUser: Model<any, any> | null = await db.models.user.findOne({ where: { name: username } })
        if (!theUser) { throw new GraphQLError('User not found') }
        let theProduct: Model<any, any> | null = await db.models.product.findOne({ where: { name: productName } })
        if (!theProduct) { throw new GraphQLError('Product not found') }

        if (type != 'cash' && type != 'credit') { throw new GraphQLError('Invalid payment type') }

        if (type == 'cash' && theProduct.dataValues.price <= theUser.dataValues.bankAccount.cashBalance) { theUser.dataValues.bankAccount.cashBalance -= theProduct.dataValues.price }
        else if (type == 'credit' && theProduct.dataValues.price <= theUser.dataValues.bankAccount.creditBalance) { theUser.dataValues.bankAccount.creditBalance -= theProduct.dataValues.price }
        else { throw new GraphQLError('Insuficient money') }

        return theUser.dataValues
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
