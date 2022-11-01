import * as data from '../static/data.json'
import { Request, Response } from 'express';
import { Product } from '../../payment-typescript/payment'
import { IProduct } from '../interfaces/app-interfaces'
import { BaseHandler } from './baseHandler'
import { reqResErrorEventListener, reqError, resError } from '../utils/EreqReserrorEventListener'
import { prepareBody } from '../utils/prepareBody'
import { genericResponseMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'
import { isLargeFile } from '../utils/isLargFile'
import { isCorrectFields } from '../utils/isCorrectFields'
import { sendResponse } from '../utils/sendResponse';


export class ProductHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res

        // this.req.method ? this[this.req.method?.toLocaleLowerCase()] : null
    }

    get(): void {
        global.counter++

        reqResErrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponseMessage(200, 'Data successfully fetched ', global.counter, data.products)
        sendResponse(this.res, serialized)
    }

    post(): void {
        global.counter++

        let body: any = [];
        this.req.on('error', (err) => {
            reqError(this.res, err)
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            this.res.on('error', (err) => {
                resError(this.res, err)
            });

            try {
                isLargeFile(Buffer.concat(body).toString())

                body = prepareBody(body)
                isCorrectFields(body, 'name', 'price')

                let newProduct: IProduct = new Product(body.name, body.price)
                data.products.push(newProduct)

                let serialized: IResponce = genericResponseMessage(200, 'Product added successfully', global.counter, data.products)
                sendResponse(this.res, serialized)
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                sendResponse(this.res, serialized)
            }
        });
    }

    delete(): void {
        global.counter++

        let body: any = [];
        this.req.on('error', (err) => {
            reqError(this.res, err)
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            this.res.on('error', (err) => {
                resError(this.res, err)
            });

            try {
                isLargeFile(Buffer.concat(body).toString())

                body = prepareBody(body)
                isCorrectFields(body, 'name', 'price')

                let flag = false
                for (let i = 0; i < data.products.length; i++) {
                    if (data.products[i].name == body.name) {
                        delete data.products[i]
                        flag = true
                        break
                    }
                }

                if (flag) {
                    let serialized: IResponce = genericResponseMessage(200, 'Product removed successfully', global.counter, data.products)
                    sendResponse(this.res, serialized)
                } else {
                    let serialized: IResponce = genericResponseMessage(500, 'Product Not found!', global.counter, {})
                    sendResponse(this.res, serialized)
                }

                this.res.end()
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                sendResponse(this.res, serialized)
            }
        });
    }

    patch(): void {
        global.counter++

        let body: any = [];
        this.req.on('error', (err) => {
            reqError(this.res, err)
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            this.res.on('error', (err) => {
                resError(this.res, err)
            });

            try {
                isLargeFile(Buffer.concat(body).toString())

                body = prepareBody(body)
                isCorrectFields(body, 'name', 'price')

                let flag = false
                for (let i = 0; i < data.products.length; i++) {
                    if (data.products[i].name == body.name) {
                        data.products[i].price = body.price
                        flag = true
                        break
                    }
                }
                if (flag) {
                    let serialized: IResponce = genericResponseMessage(200, 'Product updated successfully', global.counter, data.products)
                    sendResponse(this.res, serialized)
                } else {
                    let serialized: IResponce = genericResponseMessage(500, 'Product Not found!', global.counter, {})
                    sendResponse(this.res, serialized)
                }

                this.res.end()
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                sendResponse(this.res, serialized)
            }
        });
    }
}
