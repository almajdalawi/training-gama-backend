// import { buildSchema } from 'graphql'
import { gql } from "apollo-server-express"
import { UserHandler } from "../controler/UserHandler"
import { IResolvers } from "../shared/interfaces"


// export const schema = buildSchema(`
export const usersSchema = gql`

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
    getUsers: [User]
}

type Mutation {
    createUser(name: String!): [User]
    deleteUser(name: String!): [User]
}
`
// )

export const usersResolvers: IResolvers = {
    Query: {       // added only for Apollo
        getUsers: new UserHandler().get,
    },

    Mutation: {    // added only for Apollo
        createUser: new UserHandler().post,
        deleteUser: new UserHandler().delete,
    }
}
