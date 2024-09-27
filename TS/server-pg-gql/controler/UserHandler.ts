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
        let result: IUser[] = []
        let allData = await db.models.user.findAll()
        for (let i = 0; i < allData.length; i++) {
            let user = allData[i].dataValues
            result.push(user)
        }
        return result
    }

    async post(_: any, { name }: { name: string }): Promise<IUser[]> {
        let newUser: Omit<IUser, "id"> = new User(name)
        db.models.user.create(newUser)

        let result: IUser[] = []
        let allData = await db.models.user.findAll()
        for (let i = 0; i < allData.length; i++) {
            let user = allData[i].dataValues
            result.push(user)
        }
        return result
    }

    async delete(_: any, { name }: { name: string }): Promise<IUser[]> {
        let theUser = await db.models.user.findOne({ where: { name: name } })
        if (!theUser) { throw new GraphQLError('User not found') }
        db.models.user.destroy({ where: { name: name } })

        let result: IUser[] = []
        let allData = await db.models.user.findAll()
        for (let i = 0; i < allData.length; i++) {
            let user = allData[i].dataValues
            result.push(user)
        }
        return result
    }


    patch(): void { }
}
