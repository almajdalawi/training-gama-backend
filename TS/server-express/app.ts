import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import { Express, Request, Response } from 'express';
import { HomeRoutes, ProducRoutes, UserRoutes, BankDetailsRoutes, DepositRoutes, WithdrawRoutes, PerchaseRoutes, OsRoutes } from './routes/routes';

dotenv.config()

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 0

global.counter = 0

export const app: Express = express()
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

Object.values(new HomeRoutes(app).routes)
Object.values(new ProducRoutes(app).routes)
Object.values(new UserRoutes(app).routes)
Object.values(new BankDetailsRoutes(app).routes)
Object.values(new DepositRoutes(app).routes)
Object.values(new WithdrawRoutes(app).routes)
Object.values(new PerchaseRoutes(app).routes)
Object.values(new OsRoutes(app).routes)



function notFoundHndler(req: Request, res: Response) {
    return res.status(404).send("Not Found!!");
}
function serverErrorHndler(error: Error, req: Request, res: Response) {
    let err = {
        status: 500,
        message: "Sorry, something went wrong"
    }
    return res.status(500).send(err);
}


app.use('*', notFoundHndler);
app.use(serverErrorHndler);


app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
