import { IResponce } from "../interfaces/app-interfaces";


export function genericResponceMessage(status: number, message: string, counter: number, data: object): IResponce {
    return { status: status, message: message, visitsCounter: counter, data: data }
}