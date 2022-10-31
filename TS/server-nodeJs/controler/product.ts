import * as http from 'http'
import * as data from '../static/data.json'
import { Product } from '../../payment-typescript/payment'
import { IProduct } from '../interfaces/app-interfaces'
import { BaseHandler } from './baseHandler'
import { reqResErrorEventListener, reqError, resError } from '../utils/EreqReserrorEventListener'
import { prepareBody } from '../utils/prepareBody'
import { genericResponceMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'


export class ProductHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        reqResErrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponceMessage(200, 'Successfull', global.counter, data.products)

        this.res.setHeader('Content-Type', 'application/json')
        this.res.write(JSON.stringify(serialized))
        this.res.end()
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

            body = prepareBody(body)
            this.res.writeHead(200, { 'Content-Type': 'application/json' })

            let newProduct: IProduct = new Product(body.name, body.price)
            data.products.push(newProduct)

            let serialized: IResponce = genericResponceMessage(200, 'Product added successfully', global.counter, data.products)
            this.res.write(JSON.stringify(serialized))
            this.res.end()
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

            body = prepareBody(body)
            this.res.writeHead(200, { 'Content-Type': 'application/json' })

            let flag = false
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].name == body.name) {
                    delete data.products[i]
                    flag = true
                    break
                }
            }

            if (flag) {
                let serialized: IResponce = genericResponceMessage(200, 'Product removed successfully', global.counter, data.products)
                this.res.write(JSON.stringify(serialized))
            } else {
                let serialized: IResponce = genericResponceMessage(500, 'Product Not found!', global.counter, {})
                this.res.write(JSON.stringify(serialized))
            }

            this.res.end()
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

            body = prepareBody(body)
            this.res.writeHead(200, { 'Content-Type': 'application/json' })

            let flag = false
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].name == body.name) {
                    data.products[i].price = body.price
                    flag = true
                    break
                }
            }
            if (flag) {
                let serialized: IResponce = genericResponceMessage(200, 'Product updated successfully', global.counter, data.products)
                this.res.write(JSON.stringify(serialized))
            } else {
                let serialized: IResponce = genericResponceMessage(500, 'Product Not found!', global.counter, {})
                this.res.write(JSON.stringify(serialized))
            }

            this.res.end()
        });
    }
}
