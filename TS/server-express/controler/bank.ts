import * as data from '../static/data.json'
import { Request, Response } from 'express';
import { IBank, IProduct } from '../interfaces/app-interfaces'
import { BaseHandler } from './baseHandler'
import { genericResponseMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'
import { isLargeFile } from '../utils/isLargFile'
import { isCorrectFields } from '../utils/isCorrectFields'
import { sendResponse } from '../utils/sendResponse';



export class BankDetailsHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name')

            let bankDetails: IBank
            let flag = false
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].name == body.name) {
                    bankDetails = data.users[i].bankAccount
                    flag = true
                    let serialized: IResponce = genericResponseMessage(200, 'Bank details fetched successfull', global.counter, bankDetails)
                    sendResponse(this.res, serialized)
                    break
                }
            }

            if (!flag) {
                let serialized: IResponce = genericResponseMessage(200, 'User Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            }
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}


export class DepositHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    post(): void {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name', 'amount', 'type')

            let flag = false
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].name == body.name) {
                    if (body.type == 'cash') {
                        data.users[i].bankAccount.cashBalance += body.amount
                    } else if (body.type == 'credit') {
                        data.users[i].bankAccount.creditBalance += body.amount
                    }
                    flag = true
                    let serialized: IResponce = genericResponseMessage(200, 'Deposit Done successfull', global.counter, data.users[i].bankAccount)
                    sendResponse(this.res, serialized)
                    break
                }
            }

            if (!flag) {
                let serialized: IResponce = genericResponseMessage(200, 'User Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            }
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}


export class WithdrawHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    post(): void {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name', 'amount', 'type')

            let flag = false
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].name == body.name) {
                    if (body.type == 'cash') {
                        if (data.users[i].bankAccount.cashBalance >= body.amount) {
                            data.users[i].bankAccount.cashBalance -= body.amount
                        }
                        else {
                            let serialized: IResponce = genericResponseMessage(500, 'Not suficient money!', global.counter, {})
                            sendResponse(this.res, serialized)
                            return
                        }
                    } else if (body.type == 'credit') {
                        if (data.users[i].bankAccount.creditBalance >= body.amount) {
                            data.users[i].bankAccount.creditBalance -= body.amount
                        }
                        else {
                            let serialized: IResponce = genericResponseMessage(500, 'Not suficient money!', global.counter, {})
                            sendResponse(this.res, serialized)
                            return
                        }
                    }
                    flag = true
                    let serialized: IResponce = genericResponseMessage(200, 'Withdraw Done successfull', global.counter, data.users[i].bankAccount)
                    sendResponse(this.res, serialized)
                    break
                }
            }

            if (!flag) {
                let serialized: IResponce = genericResponseMessage(500, 'User Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            }
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}


export class PurchaseHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    post(): void {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'productName', 'username', 'type')

            let theProduct: IProduct = { name: '', price: 0 }
            let flag = false
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].name == body.productName) {
                    theProduct = data.products[i]
                    flag = true
                    break
                }
            }

            if (!flag) {
                let serialized: IResponce = genericResponseMessage(500, 'Product Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            }

            let flag2 = false
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].name == body.username) {
                    if (body.type == 'cash') {
                        if (data.users[i].bankAccount.cashBalance >= theProduct.price) {
                            data.users[i].bankAccount.cashBalance -= theProduct.price
                        }
                        else {
                            let serialized: IResponce = genericResponseMessage(500, 'Not suficient money!', global.counter, {})
                            sendResponse(this.res, serialized)
                            return
                        }
                    } else if (body.type == 'credit') {
                        if (data.users[i].bankAccount.creditBalance >= theProduct.price) {
                            data.users[i].bankAccount.creditBalance -= theProduct.price
                        }
                        else {
                            let serialized: IResponce = genericResponseMessage(500, 'Not suficient money!', global.counter, {})
                            sendResponse(this.res, serialized)
                            return
                        }
                    } else {
                        let serialized: IResponce = genericResponseMessage(500, 'Payment method not correct, Please enter "cash" or "credit"', global.counter, {})
                        sendResponse(this.res, serialized)
                        return
                    }
                    flag2 = true
                    let serialized: IResponce = genericResponseMessage(200, `Payment succeded, you purchased a ${theProduct.price}`, global.counter, data.users[i].bankAccount)
                    sendResponse(this.res, serialized)
                    break
                }
            }

            if (!flag2) {
                let serialized: IResponce = genericResponseMessage(500, 'User Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            }
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
