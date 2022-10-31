import * as http from 'http'
import { BaseHandler } from './baseHandler'


export class MyErrorHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        this.req = req
        this.res = res
    }

    notFoundHandler() {
        this.res.writeHead(404, { 'Content-Type': 'application/json' })
        this.res.write(JSON.stringify({ 'visit counter': global.counter, 'message': 'Not Found' }))
        return this.res.end()
    }
}