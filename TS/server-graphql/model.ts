import { buildSchema } from 'graphql'
import { Product, User } from '../payment-typescript/payment'
import { data } from './data'
import { IProduct, IUser } from './interfaces/app-interfaces'


export const schema = buildSchema(`
type Product {
    name: String!
    price: Int!
}

type bankAccount {
    accountId: Int!
    cashBalance: Int!
    creditBalance: Int!
}

type User {
    userId: Int!
    name: String!
    bankAccount: bankAccount!
}

type Query {
    getProducts: [Product]
    getUsers: [User]
}

type Mutation {
    createProduct(nameArg: String!, priceArg: Int!): [Product]
    createUser(nameArg: String!): [User]
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

    getUser: () => {
        return data.users
    },

    createUser: ({ nameArg }: { nameArg: string }) => {
        let newUser: IUser = new User(nameArg)
        data.users.push(newUser)

        return data.users
    }
}