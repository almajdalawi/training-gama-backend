import * as http from 'http'
import { BaseHandler } from '../controler/basehandler'
import { EreqReserrorEventListener } from '../utils/EreqReserrorEventListener'
import { genericResponceMessage } from '../utils/responceSerializer'
import { IResponce } from '../interfaces/app-interfaces'


export class HomeHandler extends BaseHandler {

    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        EreqReserrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponceMessage(200, 'Welcome to my server', global.counter, {})

        this.res.setHeader('Content-Type', 'application/json')
        this.res.write(JSON.stringify(serialized))
        this.res.end()
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}