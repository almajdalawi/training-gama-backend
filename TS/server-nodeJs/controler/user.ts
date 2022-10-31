import * as http from 'http'
import * as data from '../static/data.json'
import { BaseHandler } from '../controler/basehandler'
import { IBank, IUser } from '../interfaces/app-interfaces'
import { User } from '../../payment-typescript/payment'
import { EreqReserrorEventListener } from '../utils/EreqReserrorEventListener'
import { genericResponceMessage } from '../utils/responceSerializer'
import { IResponce } from '../interfaces/app-interfaces'



export class UserHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        EreqReserrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponceMessage(200, 'Successfull', global.counter, data.users)

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

            let newUser: IUser = new User(body.name)

            data.users.push(newUser)

            let serialized: IResponce = genericResponceMessage(200, 'User added successfully', global.counter, data.users)

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
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].name == body) {
                    delete data.users[i]
                    flag = true
                    break
                }
            }

            if (flag) {
                let serialized: IResponce = genericResponceMessage(200, 'User removed successfully', global.counter, data.users)
                this.res.write(JSON.stringify(serialized))
            } else {
                let serialized: IResponce = genericResponceMessage(200, 'User Not found!', global.counter, {})
                this.res.write(JSON.stringify(serialized))
            }

            this.res.end()
        });
    }


    patch(): void { }
}


export class BankHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
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

            let bankDetails: IBank
            let flag = false
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].name == body) {
                    bankDetails = data.users[i].bankAccount
                    flag = true
                    let serialized: IResponce = genericResponceMessage(200, 'Bank details fetched successfull', global.counter, bankDetails)
                    this.res.write(JSON.stringify(serialized))
                    break
                }
            }

            if (!flag) {
                let serialized: IResponce = genericResponceMessage(200, 'User Not found!', global.counter, {})
                this.res.write(JSON.stringify(serialized))
            }

            this.res.end()
        });
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}