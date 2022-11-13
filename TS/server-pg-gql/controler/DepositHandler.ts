import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser, IBank } from '../shared/interfaces'
import { Model } from 'sequelize';



export class DepositHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, amount, type }: { username: string, amount: number, type: string }): Promise<IUser> {
        let theUser: Model<any, any> | null = await db.models.user.findOne({ where: { name: username } })
        if (!theUser) { throw new GraphQLError('User not found') }

        if (type != 'cash' && type != 'credit') { throw new GraphQLError('Invalid payment type') }

        console.log(theUser)
        if (type == 'cash') { theUser.dataValues.bankAccount.cashBalance += amount }
        else if (type == 'credit') { theUser.dataValues.bankAccount.creditBalance += amount }
        else { throw new GraphQLError('Invalid payment type') }

        return theUser.dataValues
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
