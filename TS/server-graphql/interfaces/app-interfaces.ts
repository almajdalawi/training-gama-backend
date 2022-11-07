import * as os from 'os'
import { Express } from 'express';


export interface IProduct {
    name: string,
    price: number
}

export interface IBank {
    accountId: number,
    cashBalance: number,
    creditBalance: number
}

export interface IUser {
    userId: number,
    name: string,
    bankAccount: IBank
}

export interface IResponce {
    status: number,
    message: string,
    visitsCounter: number
    data: object
}

export interface IBaseHandler {
    get: (_: any, args: object) => any
    post: (_: any, args: object) => any
    delete: (_: any, args: object) => any
    patch: (_: any, args: object) => any

}

export interface IOsInfo {
    arch: string,
    cpus: os.CpuInfo[],
    hostname: string,
    platform: NodeJS.Platform,
    totalmem: number,
    uptime: number
}

export interface IRouteMethods {
    getMethod: Express,
    postMethod: Express,
    deleteMethod: Express,
    patchMethod: Express
}