import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser } from '../shared/interfaces'
import { Model } from 'sequelize';



export class BankDetailsHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any, { username }: { username: string }): Promise<IUser> {
        let theUser: Model<any, any> | null = await db.models.user.findOne({ where: { name: username } })
        if (!theUser) { throw new GraphQLError('User not found') }

        return theUser.dataValues
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}
