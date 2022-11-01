import { Express, Request, Response } from 'express';
import { HomeHandler } from '../controler/home'
import { ProductHandler } from '../controler/product'
import { UserHandler } from '../controler/user'
import { BankDetailsHandler, DepositHandler, WithdrawHandler, PurchaseHandler } from '../controler/bank'
import { OsInfoHandler } from '../controler/osInfo'
import { IRouteMethods } from '../interfaces/app-interfaces';



export class HomeRoutes {
    app: Express

    constructor(app: Express) {
        this.app = app
    }

    getRoutes() {
        let routs: IRouteMethods = {
            getMethod: this.app.get('/', (req: Request, res: Response) => { new HomeHandler(req, res).get(); }),
            postMethod: this.app.get('/', (req: Request, res: Response) => { new HomeHandler(req, res).post(); }),
            deleteMethod: this.app.get('/', (req: Request, res: Response) => { new HomeHandler(req, res).delete(); }),
            patchMethod: this.app.get('/', (req: Request, res: Response) => { new HomeHandler(req, res).patch(); })
        }
        return routs
    }
}


export class ProducRoutes {
    app: Express

    constructor(app: Express) {
        this.app = app
    }

    getRoutes() {
        let routs: IRouteMethods = {
            getMethod: this.app.get('/product', (req: Request, res: Response) => { new ProductHandler(req, res).get(); }),
            postMethod: this.app.post('/product', (req: Request, res: Response) => { new ProductHandler(req, res).post(); }),
            deleteMethod: this.app.delete('/product', (req: Request, res: Response) => { new ProductHandler(req, res).delete(); }),
            patchMethod: this.app.patch('/product', (req: Request, res: Response) => { new ProductHandler(req, res).patch(); }),
        }
        return routs
    }
}


export class UserRoutes {
    app: Express

    constructor(app: Express) {
        this.app = app
    }

    getRoutes() {
        let routs: IRouteMethods = {
            getMethod: this.app.get('/user', (req: Request, res: Response) => { new UserHandler(req, res).get(); }),
            postMethod: this.app.post('/user', (req: Request, res: Response) => { new UserHandler(req, res).post(); }),
            deleteMethod: this.app.delete('/user', (req: Request, res: Response) => { new UserHandler(req, res).delete(); }),
            patchMethod: this.app.patch('/user', (req: Request, res: Response) => { new UserHandler(req, res).patch(); })
        }
        return routs
    }
}


export class BankDetailsRoutes {
    app: Express

    constructor(app: Express) {
        this.app = app
    }

    getRoutes() {
        let routs: IRouteMethods = {
            getMethod: this.app.get('/bank', (req: Request, res: Response) => { new BankDetailsHandler(req, res).get(); }),
            postMethod: this.app.post('/bank', (req: Request, res: Response) => { new BankDetailsHandler(req, res).post(); }),
            deleteMethod: this.app.delete('/bank', (req: Request, res: Response) => { new BankDetailsHandler(req, res).delete(); }),
            patchMethod: this.app.patch('/bank', (req: Request, res: Response) => { new BankDetailsHandler(req, res).patch(); })
        }
        return routs
    }
}


export class DepositRoutes {
    app: Express

    constructor(app: Express) {
        this.app = app
    }

    getRoutes() {
        let routs: IRouteMethods = {
            getMethod: this.app.get('/deposit', (req: Request, res: Response) => { new DepositHandler(req, res).get(); }),
            postMethod: this.app.post('/deposit', (req: Request, res: Response) => { new DepositHandler(req, res).post(); }),
            deleteMethod: this.app.delete('/deposit', (req: Request, res: Response) => { new DepositHandler(req, res).delete(); }),
            patchMethod: this.app.patch('/deposit', (req: Request, res: Response) => { new DepositHandler(req, res).patch(); })
        }
        return routs
    }
}


export class WithdrawRoutes {
    app: Express

    constructor(app: Express) {
        this.app = app
    }

    getRoutes() {
        let routs: IRouteMethods = {
            getMethod: this.app.get('/withdraw', (req: Request, res: Response) => { new WithdrawHandler(req, res).get(); }),
            postMethod: this.app.post('/withdraw', (req: Request, res: Response) => { new WithdrawHandler(req, res).post(); }),
            deleteMethod: this.app.delete('/withdraw', (req: Request, res: Response) => { new WithdrawHandler(req, res).delete(); }),
            patchMethod: this.app.patch('/withdraw', (req: Request, res: Response) => { new WithdrawHandler(req, res).patch(); })
        }
        return routs
    }
}


export class PerchaseRoutes {
    app: Express

    constructor(app: Express) {
        this.app = app
    }

    getRoutes() {
        let routs: IRouteMethods = {
            getMethod: this.app.get('/purchase', (req: Request, res: Response) => { new PurchaseHandler(req, res).get(); }),
            postMethod: this.app.post('/purchase', (req: Request, res: Response) => { new PurchaseHandler(req, res).post(); }),
            deleteMethod: this.app.delete('/purchase', (req: Request, res: Response) => { new PurchaseHandler(req, res).delete(); }),
            patchMethod: this.app.patch('/purchase', (req: Request, res: Response) => { new PurchaseHandler(req, res).patch(); })
        }
        return routs
    }
}


export class OsRoutes {
    app: Express

    constructor(app: Express) {
        this.app = app
    }

    getRoutes() {
        let routs: IRouteMethods = {
            getMethod: this.app.get('/os', (req: Request, res: Response) => { new OsInfoHandler(req, res).get(); }),
            postMethod: this.app.post('/os', (req: Request, res: Response) => { new OsInfoHandler(req, res).post(); }),
            deleteMethod: this.app.delete('/os', (req: Request, res: Response) => { new OsInfoHandler(req, res).delete(); }),
            patchMethod: this.app.patch('/os', (req: Request, res: Response) => { new OsInfoHandler(req, res).patch(); })
        }
        return routs
    }
}
