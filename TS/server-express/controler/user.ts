import * as data from '../static/data.json'
import { Request, Response } from 'express';
import { BaseHandler } from './baseHandler'
import { IUser } from '../interfaces/app-interfaces'
import { User } from '../../payment-typescript/payment'
import { reqResErrorEventListener, reqError, resError } from '../utils/EreqReserrorEventListener'
import { prepareBody } from '../utils/prepareBody'
import { genericResponseMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'
import { isLargeFile } from '../utils/isLargFile'
import { isCorrectFields } from '../utils/isCorrectFields'
import { sendResponse } from '../utils/sendResponse';



export class UserHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        reqResErrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponseMessage(200, 'Successfull', global.counter, data.users)
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
                isCorrectFields(body, 'name')

                let newUser: IUser = new User(body.name)
                data.users.push(newUser)

                let serialized: IResponce = genericResponseMessage(200, 'User added successfully', global.counter, data.users)
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
                isCorrectFields(body, 'name')

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
                    sendResponse(this.res, serialized)
                } else {
                    let serialized: IResponce = genericResponseMessage(200, 'User Not found!', global.counter, {})
                    sendResponse(this.res, serialized)
                }
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                sendResponse(this.res, serialized)
            }
        });
    }


    patch(): void { }
}
