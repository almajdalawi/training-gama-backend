import * as http from 'http'
import * as data from '../static/data.json'
import { Product } from '../../payment-typescript/payment'
import { IProduct } from '../interfaces/app-interfaces'
import { BaseHandler } from '../controler/basehandler'
import { EreqReserrorEventListener } from '../utils/EreqReserrorEventListener'
import { genericResponceMessage } from '../utils/responceSerializer'
import { IResponce } from '../interfaces/app-interfaces'


export class ProductHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        EreqReserrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponceMessage(200, 'Successfull', global.counter, data.products)

        this.res.setHeader('Content-Type', 'application/json')
        this.res.write(JSON.stringify(serialized))
        this.res.end()
    }

    post(): void {
        global.counter++

        let body: any = [];
        this.req.on('error', (err) => {
            console.error(err);
            this.res.statusCode = 400;
            this.res.end();
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            this.res.on('error', (err) => {
                console.error(err);
            });
            this.res.writeHead(200, { 'Content-Type': 'application/json' })

            body = JSON.parse(body)


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
            console.error(err);
            this.res.statusCode = 400;
            this.res.end();
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            this.res.on('error', (err) => {
                console.error(err);
            });
            this.res.writeHead(200, { 'Content-Type': 'application/json' })

            let flag = false
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].name == body) {
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
            console.error(err);
            this.res.statusCode = 400;
            this.res.end();
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            this.res.on('error', (err) => {
                console.error(err);
            });
            this.res.writeHead(200, { 'Content-Type': 'application/json' })

            let flag = false
            let JSONBody = JSON.parse(body)
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].name == JSONBody.name) {
                    data.products[i].price = JSONBody.price
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
