import * as http from 'http'


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

// export class LargFile extends Error {
//     isLarg: boolean
//     status: number
//     constructor(message: string) {
//         super(message)

//         // assign the error class name in your custom error (as a shortcut)
//         this.name = this.constructor.name

//         // capturing the stack trace keeps the reference to your error class
//         Error.captureStackTrace(this, this.constructor);


//         this.status = 500

//         this.isLarg = true
//     }
// }
