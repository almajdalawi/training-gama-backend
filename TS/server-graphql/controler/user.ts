import { BaseHandler } from './baseHandler'
import { User } from '../../payment-typescript/payment'
import { data } from '../data'
import { IUser } from '../interfaces/app-interfaces'



export class UserHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any): Promise<IUser[]> {
        return data.users
    }

    async post(_: any, { name }: { name: string }): Promise<IUser[]> {
        let newUser: IUser = new User(name)
        data.users.push(newUser)

        return data.users
    }

    async delete(_: any, { name }: { name: string }): Promise<IUser[]> {
        let userIndex = data.users.findIndex((user: IUser) => user.name === name)
        if (userIndex == -1) { throw new Error('User not found') }
        data.users.splice(userIndex, 1)

        return data.users
    }


    patch(): void { }
}
