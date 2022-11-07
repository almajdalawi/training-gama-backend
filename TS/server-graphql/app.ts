import * as dotenv from 'dotenv'
import express from 'express'
import { Express, Request, Response } from 'express';
// import { graphqlHTTP } from 'express-graphql'
import { ApolloServer } from "apollo-server-express";
import { resolvers, schema } from './resolver'
import { genericResponseMessage } from './utils/responseSerializer';

dotenv.config()

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 0

global.counter = 0

export const app: Express = express()



// app.use('/graphql',
//     graphqlHTTP((request, response, graphQLParams) => ({
//         schema,
//         rootValue: resolvers,
//         graphiql: true,
//         context: {
//             request,
//             response,
//             context: {
//                 counter: global.counter
//             }
//         },
//     }))
// )



function notFoundHndler(req: Request, res: Response) {
    let serialized = genericResponseMessage(404, 'Not Found', global.counter, {})

    return res.status(404).send(serialized);
}

function serverErrorHndler(error: Error, req: Request, res: Response) {
    let serialized = genericResponseMessage(500, 'Server error', global.counter, {})

    return res.status(500).send(serialized);
}



async function startApolloServer(schema: any, resolvers: any) {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
    }) as any;
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



// app.listen(port, () => {
//     console.log(`[server]: Server is running at http://localhost:${port}`);
// });