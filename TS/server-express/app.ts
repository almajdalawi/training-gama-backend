import * as dotenv from 'dotenv'
import express from 'express'
import { Express, Request, Response } from 'express';
import { HomeRoutes, ProducRoutes, UserRoutes, BankDetailsRoutes, DepositRoutes, WithdrawRoutes, PerchaseRoutes, OsRoutes } from './routes/routes';

dotenv.config()

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 0

global.counter = 0

export const app: Express = express()


Object.values(new HomeRoutes(app).getRoutes())
Object.values(new ProducRoutes(app).getRoutes())
Object.values(new UserRoutes(app).getRoutes())
Object.values(new BankDetailsRoutes(app).getRoutes())
Object.values(new DepositRoutes(app).getRoutes())
Object.values(new WithdrawRoutes(app).getRoutes())
Object.values(new PerchaseRoutes(app).getRoutes())
Object.values(new OsRoutes(app).getRoutes())



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
