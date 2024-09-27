import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser } from '../shared/interfaces'
import { Model } from 'sequelize';



export class WithdrawHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, amount, type }: { username: string, amount: number, type: string }): Promise<IUser> {
        let theUser: Model<any, any> | null = await db.models.user.findOne({ where: { name: username } })
        if (!theUser) { throw new GraphQLError('User not found') }


        if (type != 'cash' && type != 'credit') { throw new GraphQLError('Invalid payment type') }

        if (type == 'cash' && amount <= theUser.dataValues.bankAccount.cashBalance) { theUser.dataValues.bankAccount.cashBalance -= amount }
        else if (type == 'credit' && amount <= theUser.dataValues.bankAccount.creditBalance) { theUser.dataValues.bankAccount.creditBalance -= amount }
        else { throw new GraphQLError('Insuficient money') }

        return theUser.dataValues
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
