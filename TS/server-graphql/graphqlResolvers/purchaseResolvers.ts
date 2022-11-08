// import { buildSchema } from 'graphql'
import { gql } from "apollo-server-express"
import { PurchaseHandler } from "../controler/PurchaseHandler"
import { IResolvers } from "../shared/interfaces"


// export const schema = buildSchema(`
export const purchaseSchema = gql`
type BankAccount {
    accountId: Int!
    cashBalance: Int!
    creditBalance: Int!
}

type Mutation {
    purchase(username: String!, productName: String!, type: String!): BankAccount
}
`
// )

export const purchaseResolvers: IResolvers = {
    Mutation: {    // added only for Apollo
        purchase: new PurchaseHandler().post,
    }
}
