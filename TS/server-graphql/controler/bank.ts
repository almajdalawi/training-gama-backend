import * as dotenv from 'dotenv'
import { Request, Response } from 'express';
import { BaseHandler } from './baseHandler'
import { genericResponseMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'
import { isLargeFile } from '../utils/isLargFile'
import { isCorrectFields } from '../utils/isCorrectFields'
import { sendResponse } from '../utils/sendResponse';

dotenv.config()
const port: string = process.env.PORT ? process.env.PORT.toString() : '0'

export class BankDetailsHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    async get() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name')

            // get bank details using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query{
                        getBankDetails(usernameArg: $usernameVar){
                          cashBalance
                          creditBalance
                        }
                      }`,
                    variables: {
                        usernameVar: body.name,
                    }
                }),
            }).then(res => res.json())

            if (fetched.data === null) {
                let serialized: IResponce = genericResponseMessage(200, 'User Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            } else {
                let serialized: IResponce = genericResponseMessage(200, 'Bank details fetched successfull', global.counter, fetched)
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

    async post() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name', 'amount', 'type')


            // deposit using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{
                        deposit(usernameArg: $usernameVar, amountArg: $amountVar, typeArg: $typeVar){
                            cashBalance
                            creditBalance
                        }
                      }`,
                    variables: {
                        usernameVar: body.name,
                        amountVar: body.amount,
                        typeVar: body.type
                    }
                }),
            }).then(res => res.json())

            if (fetched.data === null) {
                let serialized: IResponce = genericResponseMessage(200, 'User Not found or Payment method is incorrect', global.counter, {})
                sendResponse(this.res, serialized)
            } else {
                let serialized: IResponce = genericResponseMessage(200, 'Deposit Done successfull', global.counter, fetched)
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

    async post() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name', 'amount', 'type')

            // withdraw using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{
                        withdraw(usernameArg: $usernameVar, amountArg: $amountVar, typeArg: $typeVar){
                            cashBalance
                            creditBalance
                        }
                      }`,
                    variables: {
                        usernameVar: body.name,
                        amountVar: body.amount,
                        typeVar: body.type
                    }
                }),
            }).then(res => res.json())

            if (fetched.data === null) {
                let serialized: IResponce = genericResponseMessage(500, 'User Not found, or Not suficient money or Payment method is incorrect', global.counter, {})
                sendResponse(this.res, serialized)
            } else {
                let serialized: IResponce = genericResponseMessage(200, 'Withdraw Done successfull', global.counter, fetched)
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

    async post() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'productName', 'username', 'type')

            // purchase using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{
                        purchase(usernameArg: $usernameVar, productNameArg: $amountVar, typeArg: $typeVar){
                            cashBalance
                            creditBalance
                        }
                      }`,
                    variables: {
                        usernameVar: body.name,
                        amountVar: body.amount,
                        typeVar: body.type
                    }
                }),
            }).then(res => res.json())

            if (fetched.data === null) {
                let serialized: IResponce = genericResponseMessage(500, 'Product Not found, or Not suficient money, or User nit found or Payment method is incorrect', global.counter, {})
                sendResponse(this.res, serialized)
            } else {
                let serialized: IResponce = genericResponseMessage(200, `Purchase succeded`, global.counter, fetched)
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
