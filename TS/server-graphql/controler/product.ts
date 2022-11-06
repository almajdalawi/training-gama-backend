import * as dotenv from 'dotenv'
import { Request, Response } from 'express';
import { BaseHandler } from './baseHandler'
import { reqResErrorEventListener } from '../utils/EreqReserrorEventListener'
import { genericResponseMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'
import { isLargeFile } from '../utils/isLargFile'
import { isCorrectFields } from '../utils/isCorrectFields'
import { sendResponse } from '../utils/sendResponse';


dotenv.config()
const port: string = process.env.PORT ? process.env.PORT.toString() : '0'

export class ProductHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    async get() {
        global.counter++

        reqResErrorEventListener(this.req, this.res)

        // get products using graphQL
        let fetched = await fetch(`http://localhost:${port}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                    getProducts{
                        name
                        price
                    }
                }`
            })
        }).then(res => res.json())


        let serialized: IResponce = genericResponseMessage(200, 'Data successfully fetched ', global.counter, fetched)
        sendResponse(this.res, serialized)
    }

    async post() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name', 'price')

            // post products using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{
                        createProduct(nameArg: $nameVar, priceArg: $priceVar) {
                          name
                        }
                      }`,
                    variables: {
                        nameVar: body.name,
                        priceVar: body.price
                    }
                }),
            }).then(res => res.json())

            let serialized: IResponce = genericResponseMessage(200, 'Product added successfully', global.counter, fetched)
            sendResponse(this.res, serialized)
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }

    async delete() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name')

            // delete products using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{
                        deleteProduct(nameArg: $nameVar) {
                          name
                        }
                      }`,
                    variables: {
                        nameVar: body.name
                    }
                }),
            }).then(res => res.json())

            if (!fetched.data) {
                let serialized: IResponce = genericResponseMessage(500, 'Product Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            } else {
                let serialized: IResponce = genericResponseMessage(200, 'Product removed successfully', global.counter, fetched)
                sendResponse(this.res, serialized)
            }
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }

    async patch() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name', 'price')

            // update products using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{
                        updateProduct(nameArg: $nameVar, priceArg: $priceVar) {
                          name
                        }
                      }`,
                    variables: {
                        nameVar: body.name,
                        priceVar: body.price
                    }
                }),
            }).then(res => res.json())

            if (!fetched.data) {
                let serialized: IResponce = genericResponseMessage(500, 'Product Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            } else {
                let serialized: IResponce = genericResponseMessage(200, 'Product updated successfully', global.counter, fetched)
                sendResponse(this.res, serialized)
            }
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }
}
