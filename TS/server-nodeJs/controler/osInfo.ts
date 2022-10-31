import * as http from 'http'
import * as os from 'os'
import { genericResponceMessage } from '../utils/responceSerializer'
import { EreqReserrorEventListener } from '../utils/EreqReserrorEventListener'
import { BaseHandler } from '../controler/basehandler'
import { IOsInfo, IResponce } from '../interfaces/app-interfaces'


export class OsInfoHandler extends BaseHandler {

    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
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

        EreqReserrorEventListener(this.req, this.res)

        let serialized: IResponce = genericResponceMessage(200, 'Successfull', global.counter, data)

        this.res.setHeader('Content-Type', 'application/json')
        this.res.write(JSON.stringify(serialized))
        this.res.end()
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}