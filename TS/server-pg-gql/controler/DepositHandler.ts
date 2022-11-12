import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser, IBank } from '../shared/interfaces'



export class DepositHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, amount, type }: { username: string, amount: number, type: string }): Promise<IBank> {
        let theUser: IUser = db.users.findOne((user: IUser) => user.name == username)
        if (!theUser) { throw new GraphQLError('User not found') }

        if (type != 'cash' && type != 'credit') { throw new GraphQLError('Invalid payment type') }

        if (type == 'cash') { theUser.bankAccount.cashBalance += amount }
        else if (type == 'credit') { theUser.bankAccount.creditBalance += amount }
        else { throw new GraphQLError('Invalid payment type') }

        return theUser.bankAccount
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
