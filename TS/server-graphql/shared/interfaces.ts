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

export interface IResolvers {
    Query?: Object,
    Mutation?: Object
}

export interface IGetBankDetails {
    username: string
}

export interface IPostProduct {
    name: string,
    price: number
}

export interface IPostUser {
    name: string
}

export interface IPostBankTransaction {
    username: string,
    amount: number,
    type: string
}

export interface IPurchase {
    username: string,
    productName: string,
    type: string
}


export interface IDeleteProduct {
    name: string
}

export interface IDeleteUser {
    name: string
}

export interface IPatchProduct {
    name: string,
    price: number
}

export type IGet = IGetBankDetails | void
export type IPost = IPostProduct | IPostUser | IPostBankTransaction | IPurchase
export type IDelete = IDeleteProduct | IDeleteUser
export type IPatch = IPatchProduct

export type IGetRes = Promise<IProduct[]> | Promise<IUser[]> | Promise<IBank> | void
export type IPostRes = Promise<IProduct[]> | Promise<IUser[]> | Promise<IBank> | void
export type IDeleteRes = Promise<IProduct[]> | Promise<IUser[]> | void
export type IPatchRes = Promise<IProduct[]> | Promise<IUser[]> | void


export interface IBaseHandler {
    get: (_: any, args: IGet) => IGetRes
    post: (_: any, args: IPost) => IPostRes
    delete: (_: any, args: IDelete) => IDeleteRes
    patch: (_: any, args: IPatch) => IPatchRes
}
