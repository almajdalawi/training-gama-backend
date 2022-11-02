import { Response } from 'express';
import { IResponce } from "../interfaces/app-interfaces"

export function sendResponse(res: Response, serialized: IResponce) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(serialized))
}