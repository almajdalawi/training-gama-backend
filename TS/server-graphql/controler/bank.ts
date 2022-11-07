import { BaseHandler } from './baseHandler'
import { data } from '../data'
import { IUser, IProduct, IBank } from '../interfaces/app-interfaces'



export class BankDetailsHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any, { username }: { username: string }): Promise<IBank> {
        let theUser: IUser = data.users.find((user: IUser) => user.name == username)
        if (!theUser) { throw new Error('User not found') }

        return theUser.bankAccount
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}


export class DepositHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, amount, type }: { username: string, amount: number, type: string }): Promise<IBank> {
        let theUser: IUser = data.users.find((user: IUser) => user.name == username)
        if (!theUser) { throw new Error('User not found') }

        if (type != 'cash' && type != 'credit') { throw new Error('Invalid payment type') }

        if (type == 'cash') { theUser.bankAccount.cashBalance += amount }
        else if (type == 'credit') { theUser.bankAccount.creditBalance += amount }
        else { throw new Error('Invalid payment type') }

        return theUser.bankAccount
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}


export class WithdrawHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, amount, type }: { username: string, amount: number, type: string }): Promise<IBank> {
        let theUser: IUser = data.users.find((user: IUser) => user.name == username)
        if (!theUser) { throw new Error('User not found') }

        console.log(type);

        if (type != 'cash' && type != 'credit') { throw new Error('Invalid payment type') }

        if (type == 'cash' && amount <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= amount }
        else if (type == 'credit' && amount <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= amount }
        else { throw new Error('Insuficient money') }

        return theUser.bankAccount
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}


export class PurchaseHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, productName, type }: { username: string, productName: string, type: string }): Promise<IBank> {
        let theUser: IUser = data.users.find((user: IUser) => user.name == username)
        if (!theUser) { throw new Error('User not found') }
        let theProduct: IProduct = data.products.find((product: IProduct) => product.name == productName)
        if (!theProduct) { throw new Error('Product not found') }

        if (type != 'cash' && type != 'credit') { throw new Error('Invalid payment type') }

        if (type == 'cash' && theProduct.price <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= theProduct.price }
        else if (type == 'credit' && theProduct.price <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= theProduct.price }
        else { throw new Error('Insuficient money') }

        return theUser.bankAccount
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
