import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser } from '../shared/interfaces'
import { User } from '../../payment-typescript/payment'



export class UserHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any): Promise<IUser[]> {
        return db.users.findAll()
    }

    async post(_: any, { name }: { name: string }): Promise<IUser[]> {
        let newUser: IUser = new User(name)
        db.users.create(newUser)

        return db.users.findAll()
    }

    async delete(_: any, { name }: { name: string }): Promise<IUser[]> {
        let userIndex = await db.users.findOne({ where: { name: name } })
        if (userIndex == -1) { throw new GraphQLError('User not found') }
        db.users.destroy({ where: { name: name } })

        return db.users.findAll()
    }


    patch(): void { }
}
