export interface ProductObj {
    name: string,
    price: number
}

export interface BankObj {
    accountId: number,
    cashBalance: number,
    creditBalance: number
}

export interface UserObj {
    userId: number,
    name: string,
    bankAccount: BankObj
}