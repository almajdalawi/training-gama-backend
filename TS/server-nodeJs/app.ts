import * as http from 'http'
import { HomeHandler } from './controler/home'
import { ProductHandler } from './controler/product'
import { UserHandler } from './controler/user'
import { BankDetailsHandler, DepositHandler, WithdrawHandler, PurchaseHandler } from './controler/bank'
import { MyErrorHandler } from './controler/Error'
import { OsInfoHandler } from './controler/osInfo'


global.counter = 0

// enum Methods {
//     GET = 'GET',
//     POST = 'POST',
//     DELETE = 'DELETE',
//     PATCH = 'PATCH'
// }

export const handleRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const url: string | undefined = req.url
    const method: string | undefined = req.method
    const headers: http.IncomingHttpHeaders = req.headers

    let routes: any = {
        '/': new HomeHandler(req, res),
        '/product': new ProductHandler(req, res),
        '/user': new UserHandler(req, res),
        '/bank': new BankDetailsHandler(req, res),
        '/deposit': new DepositHandler(req, res),
        '/withdraw': new WithdrawHandler(req, res),
        '/purchase': new PurchaseHandler(req, res),
        '/os': new OsInfoHandler(req, res)
    }

    url && method && routes[url] ? routes[url][method.toLowerCase()]() : new MyErrorHandler(req, res).notFoundHandler()
}
