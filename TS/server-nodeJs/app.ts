import * as http from 'http'
import { Product, User } from '../payment-typescript/payment'
import { ProductObj, BankObj, UserObj } from './interfaces/app-interfaces'
import * as data from './static/data.json'

let counter = 0

// enum Methods {
//     GET,
//     POST,
//     DELETE,
//     PATCH
// }

export const handleRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const url: string | undefined = req.url
    const method: string | undefined = req.method
    const headers: http.IncomingHttpHeaders = req.headers

    let routes: any = {
        '/': { 'GET': () => homeHandler(req, res) },
        '/products': {
            'GET': () => getProductsHandler(req, res),
            'POST': () => addProductHandler(req, res),
            'DELETE': () => deleteProductHandler(req, res),
            'PATCH': () => updateProductHandler(req, res),
        },
        '/user': {
            'GET': () => getUsersHandler(req, res),
            'POST': () => addUserHandler(req, res),
            'DELETE': () => deleteUserHandler(req, res),
        },
        '/bank': { 'POST': () => bankDetailsHandler(req, res) },
        '/deposit': { 'POST': () => depositHandler(req, res) },
        '/withdraw': { 'POST': () => withdrawHandler(req, res) },
        '/purchase': { 'POST': () => purchaseHandler(req, res) }
    }

    url && method && routes[url] ? routes[url][method]() : notFoundHandler(req, res)
}




function homeHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Welcome to my server' }))
    res.end()
}




function getProductsHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ 'visit counter': counter, 'products': data.products }))
    res.end()
}

function addProductHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        body = JSON.parse(body)


        let newProduct: ProductObj = new Product(body.name, body.price)

        data.products.push(newProduct)
        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product added successfully', 'products': data.products }))

        res.end()
    });
}

function deleteProductHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        let flag = false
        for (let i = 0; i < data.products.length; i++) {
            if (data.products[i].name == body) {
                delete data.products[i]
                flag = true
                break
            }
        }

        if (flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product removed successfully', 'products': data.products }))
        } else {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product Not found!' }))
        }

        res.end()
    });
}

function updateProductHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        let flag = false
        let JSONBody = JSON.parse(body)
        for (let i = 0; i < data.products.length; i++) {
            if (data.products[i].name == JSONBody.name) {
                data.products[i].price = JSONBody.price
                flag = true
                break
            }
        }
        if (flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product updated successfully', 'products': data.products }))
        } else {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product Not found!' }))
        }

        res.end()
    });
}





function getUsersHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ 'visit counter': counter, 'products': data.users }))
    res.end()
}

function addUserHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        body = JSON.parse(body)

        let newUser: UserObj = new User(body.name)

        data.users.push(newUser)
        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product added successfully', 'products': data.users }))

        res.end()
    });
}

function deleteUserHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        let flag = false
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].name == body) {
                delete data.users[i]
                flag = true
                break
            }
        }

        if (flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product removed successfully', 'products': data.users }))
        } else {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product Not found!' }))
        }

        res.end()
    });
}




function bankDetailsHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        let bankDetails: BankObj
        let flag = false
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].name == body) {
                bankDetails = data.users[i].bankAccount
                flag = true
                res.write(JSON.stringify({ 'visit counter': counter, 'bankDetails': bankDetails }))
                break
            }
        }

        if (!flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'User Not found!' }))
        }

        res.end()
    });
}

function depositHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        body = JSON.parse(body)

        let flag = false
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].name == body.name) {
                if (body.type == 'cash') {
                    data.users[i].bankAccount.cashBalance += body.amount
                } else if (body.type == 'credit') {
                    data.users[i].bankAccount.creditBalance += body.amount
                }
                flag = true
                res.write(JSON.stringify({ 'visit counter': counter, 'bankDetails': data.users[i].bankAccount }))
                break
            }
        }

        if (!flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'User Not found!' }))
        }

        res.end()
    });
}


function withdrawHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        body = JSON.parse(body)

        let flag = false
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].name == body.name) {
                if (body.type == 'cash') {
                    if (data.users[i].bankAccount.cashBalance >= body.amount) {
                        data.users[i].bankAccount.cashBalance -= body.amount
                    }
                    else {
                        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Not suficient money!' }))
                        res.end()
                        return
                    }
                } else if (body.type == 'credit') {
                    if (data.users[i].bankAccount.creditBalance >= body.amount) {
                        data.users[i].bankAccount.creditBalance -= body.amount
                    }
                    else {
                        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Not suficient money!' }))
                        res.end()
                        return
                    }
                }
                flag = true
                res.write(JSON.stringify({ 'visit counter': counter, 'bankDetails': data.users[i].bankAccount }))
                break
            }
        }

        if (!flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'User Not found!' }))
        }

        res.end()
    });
}

function purchaseHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        body = JSON.parse(body)

        let theProduct: ProductObj = { name: '', price: 0 }
        let flag = false
        for (let i = 0; i < data.products.length; i++) {
            if (data.products[i].name == body.productName) {
                theProduct = data.products[i]
                flag = true
                break
            }
        }

        if (!flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product Not found!' }))
            res.end()
        }

        let flag2 = false
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].name == body.username) {
                if (body.type == 'cash') {
                    if (data.users[i].bankAccount.cashBalance >= theProduct.price) {
                        data.users[i].bankAccount.cashBalance -= theProduct.price
                    }
                    else {
                        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Not suficient money!' }))
                        res.end()
                        return
                    }
                } else if (body.type == 'credit') {
                    if (data.users[i].bankAccount.creditBalance >= theProduct.price) {
                        data.users[i].bankAccount.creditBalance -= theProduct.price
                    }
                    else {
                        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Not suficient money!' }))
                        res.end()
                        return
                    }
                }
                flag2 = true
                res.write(JSON.stringify({ 'visit counter': counter, "message": `Payment succeded, you purchased a ${theProduct.price}`, 'bankDetails': data.users[i].bankAccount }))
                break
            }
        }

        if (!flag2) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'User Not found!' }))
        }

        res.end()
    });
}






function notFoundHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Not Found' }))
    return res.end()
}
