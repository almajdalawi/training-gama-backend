import * as dotenv from 'dotenv'
import express from 'express'
import { Express, Request, Response } from 'express';
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { schema, resolvers } from './graphqlResolvers/resolvers'

dotenv.config()

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 0

global.counter = 0

export const app: Express = express()



function notFoundHndler(req: Request, res: Response): Response {
    return res.status(404).send('Page Not found 404');
}

function serverErrorHndler(error: Error, req: Request, res: Response): Response {
    return res.status(500).send('Server Error 500, ' + error);
}



async function startApolloServer(schema: any, resolvers: any): Promise<void> {
    const server: ApolloServer<ExpressContext> = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
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

startApolloServer(schema, resolvers);
