import * as os from 'os'

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
    get: () => void
    post: () => void
    delete: () => void
    patch: () => void

}

export interface IOsInfo {
    arch: string,
    cpus: os.CpuInfo[],
    hostname: string,
    platform: NodeJS.Platform,
    totalmem: number,
    uptime: number
}