import express from 'express'
// import * as pg from 'pg'
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { bankDetailsSchema, bankDetailsResolvers } from './graphqlResolvers/bankDetailsResolvers'
import { depositSchema, depositResolvers } from './graphqlResolvers/depositResolvers'
import { Express, Request, Response } from 'express';
import { getEnv } from './shared/getEnv'
import { productsSchema, productsResolvers } from './graphqlResolvers/productsResolvers'
import { purchaseSchema, purchaseResolvers } from './graphqlResolvers/purchaseResolvers'
import { usersSchema, usersResolvers } from './graphqlResolvers/usersResolvers'
import { withdrawSchema, withdrawResolvers } from './graphqlResolvers/withdrawResolvers'
import { Sequelize } from 'sequelize';
// import { dbAlterTables, UserModel, ProductModel, BankDetailsModel } from './db/models';
import { DataTypes } from 'sequelize';


const port: number = parseInt(getEnv('PORT', 4000))

export const app: Express = express()





// const client: pg.Client = new pg.Client({
//     user: getEnv('PG_USER', 'postgres'),
//     host: getEnv('PG_HOST', 'localhost'),
//     database: getEnv('PG_DATABASE', 'payment_data'),
//     password: getEnv('PG_PASSWORD', '1234'),
//     port: parseInt(getEnv('PG_PORT', 5432))
// });



let dbCredentials = {
    user: getEnv('PG_USER', 'postgres'),
    host: getEnv('PG_HOST', 'localhost'),
    database: getEnv('PG_DATABASE', 'payment_data'),
    password: getEnv('PG_PASSWORD', '1234'),
    port: parseInt(getEnv('PG_PORT', 5432))
}

// ('postgres://user:password@example.com:5432/dbname')
// export const db = new Sequelize('postgres://postgres:1234@localhost:5432/payment_data');
export const db = new Sequelize(dbCredentials.database, dbCredentials.user, dbCredentials.password, {
    host: dbCredentials.host,
    dialect: 'postgres'
});





export const ProductModel = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        timestamps: false,
    }
);

export const UserModel = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bankAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        timestamps: false,
    }
);

export const BankDetailsModel = db.define('bankDetails', {
    accountId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cashBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    creditBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
    {
        timestamps: false,
    }
);


UserModel.belongsTo(BankDetailsModel, { foreignKey: 'bankAccountId' });

db.sync({ alter: true }).then(() => {
    console.log('Database & tables created!');
});






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





    // client.connect(
    //     async (err: Error) => {
    //         if (err) {
    //             console.log('Error connecting to database: ', err)
    //         } else {
    //             await new Promise<void>((resolve) =>
    //                 app.listen({ port: port }, resolve)
    //             );
    //             console.log(`Server ready at http://localhost:${port + server.graphqlPath}`);
    //         }
    //     })

    try {
        await db.authenticate()
        await new Promise<void>((resolve) => app.listen({ port: port }, resolve))
        console.log(`Server ready at http://localhost:${port + server.graphqlPath}`);
    } catch (error) {
        console.log('Error connecting to database: ', error)
    }
}

const schemas: any[] = [productsSchema, usersSchema, bankDetailsSchema, depositSchema, withdrawSchema, purchaseSchema]
const resolvers: any[] = [productsResolvers, usersResolvers, bankDetailsResolvers, depositResolvers, withdrawResolvers, purchaseResolvers]
startApolloServer(schemas, resolvers);
