import { buildSchema } from 'graphql'
import { Product, User } from '../payment-typescript/payment'
import { data } from './data'
import { IProduct, IUser } from './interfaces/app-interfaces'


export const schema = buildSchema(`
type Product {
    name: String!
    price: Int!
}

type BankAccount {
    accountId: Int!
    cashBalance: Int!
    creditBalance: Int!
}

type User {
    userId: Int!
    name: String!
    bankAccount: BankAccount!
}

type Query {
    getProducts: [Product]
    getUsers: [User]
    getBankDetails(usernameArg: String!): BankAccount
}

type Mutation {
    createProduct(nameArg: String!, priceArg: Int!): [Product]
    deleteProduct(nameArg: String!): [Product]
    updateProduct(nameArg: String!, priceArg: Int!): [Product]
    createUser(nameArg: String!): [User]
    deleteUser(nameArg: String!): [User]
    deposit(usernameArg: String!, amountArg: Int!, typeArg: String!): BankAccount
    withdraw(usernameArg: String!, amountArg: Int!, typeArg: String!): BankAccount
    purchase(usernameArg: String!, productNameArg: String!, typeArg: String!): BankAccount
}
`)


export const root = {
    getProducts: () => {
        return data.products
    },

    createProduct: ({ nameArg, priceArg }: { nameArg: string, priceArg: number }) => {
        let newProduct: IProduct = new Product(nameArg, priceArg)
        data.products.push(newProduct)

        return data.products
    },

    deleteProduct: ({ nameArg }: { nameArg: string }) => {
        let index = data.products.findIndex((product: IProduct) => product.name === nameArg)
        data.products.splice(index, 1)

        return data.products
    },

    updateProduct: ({ nameArg, priceArg }: { nameArg: string, priceArg: number }) => {
        let productIndex = data.products.findIndex((product: IProduct) => product.name === nameArg)
        data.products[productIndex].price = priceArg

        return data.products
    },

    getUser: () => {
        return data.users
    },

    createUser: ({ nameArg }: { nameArg: string }) => {
        let newUser: IUser = new User(nameArg)
        data.users.push(newUser)

        return data.users
    },

    deleteUser: ({ nameArg }: { nameArg: string }) => {
        let index = data.users.findIndex((user: IUser) => user.name === nameArg)
        data.users.splice(index, 1)

        return data.users
    },

    getBankDetails: ({ usernameArg }: { usernameArg: string }) => {
        let theUser: IUser = data.users.find((user: IUser) => user.name == usernameArg)

        return theUser.bankAccount
    },

    deposit: ({ usernameArg, amountArg, typeArg }: { usernameArg: string, amountArg: number, typeArg: string }) => {
        let theUser: IUser = data.users.find((user: IUser) => user.name == usernameArg)
        if (typeArg == 'cash') { theUser.bankAccount.cashBalance += amountArg }
        if (typeArg == 'credit') { theUser.bankAccount.creditBalance += amountArg }

        return theUser.bankAccount
    },

    withdraw: ({ usernameArg, amountArg, typeArg }: { usernameArg: string, amountArg: number, typeArg: string }) => {
        let theUser: IUser = data.users.find((user: IUser) => user.name == usernameArg)
        if (typeArg == 'cash' && amountArg <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= amountArg }
        if (typeArg == 'credit' && amountArg <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= amountArg }

        return theUser.bankAccount
    },

    purchase: ({ usernameArg, productNameArg, typeArg }: { usernameArg: string, productNameArg: string, typeArg: string }) => {
        let theUser: IUser = data.users.find((user: IUser) => user.name == usernameArg)
        let theProduct: IProduct = data.products.find((product: IProduct) => product.name == productNameArg)
        if (typeArg == 'cash' && theProduct.price <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= theProduct.price }
        if (typeArg == 'credit' && theProduct.price <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= theProduct.price }

        return theUser.bankAccount
    }
}