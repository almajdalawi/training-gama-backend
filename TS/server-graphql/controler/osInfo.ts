import * as os from 'os'
import { Request, Response } from 'express';
import { genericResponseMessage } from '../utils/responseSerializer'
import { reqResErrorEventListener } from '../utils/EreqReserrorEventListener'
import { BaseHandler } from './baseHandler'
import { IOsInfo, IResponce } from '../interfaces/app-interfaces'
import { sendResponse } from '../utils/sendResponse';


export class OsInfoHandler extends BaseHandler {

    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++
        let data: IOsInfo = {
            arch: os.arch(),
            cpus: os.cpus(),
            hostname: os.hostname(),
            platform: os.platform(),
            totalmem: os.totalmem(),
            uptime: os.uptime(),
        }

        reqResErrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponseMessage(200, 'Successfull', global.counter, data)
        sendResponse(this.res, serialized)
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}