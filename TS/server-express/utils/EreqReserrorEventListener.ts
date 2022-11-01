import { Request, Response } from 'express';


export function reqResErrorEventListener(req: Request, res: Response) {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });

    res.on('error', (err) => {
        console.error(err);
        res.statusCode = 500;
        res.end();
    });

}


export class LargeFileErr extends Error {
    isLarg: boolean
    status: number
    constructor(message: string) {
        super(message)

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);

        this.status = 500
        this.isLarg = true
    }
}

