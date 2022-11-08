import * as dotenv from 'dotenv'
import express from 'express'
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { bankDetailsSchema, bankDetailsResolvers } from './graphqlResolvers/bankDetailsResolvers'
import { depositSchema, depositResolvers } from './graphqlResolvers/depositResolvers'
import { Express, Request, Response } from 'express';
import { getEnv } from './shared/getEnv'
import { productsSchema, productsResolvers } from './graphqlResolvers/productsResolvers'
import { purchaseSchema, purchaseResolvers } from './graphqlResolvers/purchaseResolvers'
import { usersSchema, usersResolvers } from './graphqlResolvers/usersResolvers'
import { withdrawSchema, withdrawResolvers } from './graphqlResolvers/withdrawResolvers'


dotenv.config()
const port: number = getEnv(process.env.PORT, 4000);

export const app: Express = express()



function notFoundHndler(req: Request, res: Response): Response {
    return res.status(404).send('Page Not found 404');
}

function serverErrorHndler(error: Error, req: Request, res: Response): Response {
    return res.status(500).send('Server Error 500, ' + error);
}



async function startApolloServer(schemas: any[], resolvers: any[]): Promise<void> {
    const server: ApolloServer<ExpressContext> = new ApolloServer({
        typeDefs: schemas,
        resolvers: resolvers
    })
    await server.start();
    server.applyMiddleware({ app });


    app.use('*', notFoundHndler);
    app.use(serverErrorHndler);

    await new Promise<void>((resolve) =>
        app.listen({ port: port }, resolve)
    );
    console.log(`Server ready at http://localhost:${port + server.graphqlPath}`);
}

const schemas: any[] = [productsSchema, usersSchema, bankDetailsSchema, depositSchema, withdrawSchema, purchaseSchema]
const resolvers: any[] = [productsResolvers, usersResolvers, bankDetailsResolvers, depositResolvers, withdrawResolvers, purchaseResolvers]
startApolloServer(schemas, resolvers);
