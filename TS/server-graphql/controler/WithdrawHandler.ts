import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { data } from '../data'
import { IUser, IBank } from '../shared/interfaces'



export class WithdrawHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, amount, type }: { username: string, amount: number, type: string }): Promise<IBank> {
        let theUser: IUser = data.users.find((user: IUser) => user.name == username)
        if (!theUser) { throw new GraphQLError('User not found') }

        console.log(type);

        if (type != 'cash' && type != 'credit') { throw new GraphQLError('Invalid payment type') }

        if (type == 'cash' && amount <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= amount }
        else if (type == 'credit' && amount <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= amount }
        else { throw new GraphQLError('Insuficient money') }

        return theUser.bankAccount
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
