// import { buildSchema } from 'graphql'
import { gql } from "apollo-server-express"
import { ProductHandler } from "./controler/product"
import { UserHandler } from "./controler/user"
import { BankDetailsHandler, DepositHandler, WithdrawHandler, PurchaseHandler } from "./controler/bank"


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
`
// )

export const resolvers = {
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
