import { BaseHandler } from './baseHandler'
import { data } from '../data'
import { IUser, IProduct } from '../interfaces/app-interfaces'



export class BankDetailsHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any, { usernameArg }: { usernameArg: string }) {
        global.counter++

        let theUser: IUser = data.users.find((user: IUser) => user.name == usernameArg)
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

    async post(_: any, { usernameArg, amountArg, typeArg }: { usernameArg: string, amountArg: number, typeArg: string }) {
        global.counter++

        let theUser: IUser = data.users.find((user: IUser) => user.name == usernameArg)
        if (!theUser) { throw new Error('User not found') }

        if (typeArg != 'cash' && typeArg != 'credit') { throw new Error('Invalid payment type') }

        if (typeArg == 'cash') { theUser.bankAccount.cashBalance += amountArg }
        else if (typeArg == 'credit') { theUser.bankAccount.creditBalance += amountArg }
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

    async post(_: any, { usernameArg, amountArg, typeArg }: { usernameArg: string, amountArg: number, typeArg: string }) {
        global.counter++

        let theUser: IUser = data.users.find((user: IUser) => user.name == usernameArg)
        if (!theUser) { throw new Error('User not found') }

        console.log(typeArg);

        if (typeArg != 'cash' && typeArg != 'credit') { throw new Error('Invalid payment type') }

        if (typeArg == 'cash' && amountArg <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= amountArg }
        else if (typeArg == 'credit' && amountArg <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= amountArg }
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

    async post(_: any, { usernameArg, productNameArg, typeArg }: { usernameArg: string, productNameArg: string, typeArg: string }) {
        global.counter++

        let theUser: IUser = data.users.find((user: IUser) => user.name == usernameArg)
        if (!theUser) { throw new Error('User not found') }
        let theProduct: IProduct = data.products.find((product: IProduct) => product.name == productNameArg)
        if (!theProduct) { throw new Error('Product not found') }

        if (typeArg != 'cash' && typeArg != 'credit') { throw new Error('Invalid payment type') }

        if (typeArg == 'cash' && theProduct.price <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= theProduct.price }
        else if (typeArg == 'credit' && theProduct.price <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= theProduct.price }
        else { throw new Error('Insuficient money') }

        return theUser.bankAccount
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
