import { Request, Response } from 'express';
import { BaseHandler } from './baseHandler'
import { reqResErrorEventListener } from '../utils/EreqReserrorEventListener'
import { genericResponseMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'
import { sendResponse } from '../utils/sendResponse';


export class HomeHandler extends BaseHandler {

    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        reqResErrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponseMessage(200, 'Welcome to my server', global.counter, {})
        sendResponse(this.res, serialized)
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}