import * as http from 'http'
import * as data from '../static/data.json'
import { BaseHandler } from './baseHandler'
import { IBank, IUser } from '../interfaces/app-interfaces'
import { User } from '../../payment-typescript/payment'
import { reqResErrorEventListener, reqError, resError } from '../utils/EreqReserrorEventListener'
import { prepareBody } from '../utils/prepareBody'
import { genericResponseMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'
import { isLargeFile } from '../utils/isLargFile'
import { isCorrectFields } from '../utils/isCorrectFields'



export class UserHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        reqResErrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponseMessage(200, 'Successfull', global.counter, data.users)

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

            try {
                isLargeFile(Buffer.concat(body).toString())

                body = prepareBody(body)
                isCorrectFields(body, 'name')
                this.res.writeHead(200, { 'Content-Type': 'application/json' })

                let newUser: IUser = new User(body.name)
                data.users.push(newUser)

                let serialized: IResponce = genericResponseMessage(200, 'User added successfully', global.counter, data.users)
                this.res.write(JSON.stringify(serialized))
                this.res.end()
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                this.res.write(JSON.stringify(serialized))
                this.res.end()
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
                isCorrectFields(body, 'name')
                this.res.writeHead(200, { 'Content-Type': 'application/json' })

                let flag = false
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].name == body.name) {
                        delete data.users[i]
                        flag = true
                        break
                    }
                }

                if (flag) {
                    let serialized: IResponce = genericResponseMessage(200, 'User removed successfully', global.counter, data.users)
                    this.res.write(JSON.stringify(serialized))
                } else {
                    let serialized: IResponce = genericResponseMessage(200, 'User Not found!', global.counter, {})
                    this.res.write(JSON.stringify(serialized))
                }

                this.res.end()
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                this.res.write(JSON.stringify(serialized))
                this.res.end()
            }
        });
    }


    patch(): void { }
}
