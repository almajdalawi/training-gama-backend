import { Request, Response } from 'express';
import { IResponce } from '../interfaces/app-interfaces';
import { genericResponseMessage } from '../utils/responseSerializer';


export class MyErrorHandler {
    constructor(private req: Request, private res: Response) {
        this.req = req
        this.res = res
    }

    notFoundHandler() {
        let serialized: IResponce = genericResponseMessage(200, 'Page Not Found!', global.counter, {})
        this.res.writeHead(404, { 'Content-Type': 'application/json' })
        this.res.send(JSON.stringify(serialized))
    }
}
