import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { data } from '../data'
import { IUser, IBank } from '../shared/interfaces'



export class BankDetailsHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any, { username }: { username: string }): Promise<IBank> {
        let theUser: IUser = data.users.find((user: IUser) => user.name == username)
        if (!theUser) { throw new GraphQLError('User not found') }

        return theUser.bankAccount
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}
