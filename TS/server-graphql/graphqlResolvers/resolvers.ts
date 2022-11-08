// import { buildSchema } from 'graphql'
import { gql } from "apollo-server-express"
import { ProductHandler } from "../controler/ProductHandler"
import { UserHandler } from "../controler/UserHandler"
import { BankDetailsHandler } from "../controler/BankDetailsHandler"
import { DepositHandler } from "../controler/DepositHandler"
import { WithdrawHandler } from "../controler/WithdrawHandler"
import { PurchaseHandler } from "../controler/PurchaseHandler"
import { IResolvers } from "../shared/interfaces"


// export const schema = buildSchema(`
export const schema = gql`
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
    getBankDetails(username: String!): BankAccount
}

type Mutation {
    createProduct(name: String!, price: Int!): [Product]
    deleteProduct(name: String!): [Product]
    updateProduct(name: String!, price: Int!): [Product]
    createUser(name: String!): [User]
    deleteUser(name: String!): [User]
    deposit(username: String!, amount: Int!, type: String!): BankAccount
    withdraw(username: String!, amount: Int!, type: String!): BankAccount
    purchase(username: String!, productName: String!, type: String!): BankAccount
}
`
// )

export const resolvers: IResolvers = {
    Query: {       // added only for Apollo
        getProducts: new ProductHandler().get,
        getUsers: new UserHandler().get,
        getBankDetails: new BankDetailsHandler().get
    },

    Mutation: {    // added only for Apollo
        createProduct: new ProductHandler().post,
        deleteProduct: new ProductHandler().delete,
        updateProduct: new ProductHandler().patch,
        createUser: new UserHandler().post,
        deleteUser: new UserHandler().delete,
        deposit: new DepositHandler().post,
        withdraw: new WithdrawHandler().post,
        purchase: new PurchaseHandler().post,
    }
}
