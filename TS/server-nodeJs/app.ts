
import * as http from 'http'
import { Product, User, Bank } from '../payment-typescript/payment'

interface ProductObj {
    name: string,
    price: number
}

interface BankObj {
    accountId: number,
    cashBalance: number,
    creditBalance: number
}

interface UserObj {
    userId: number,
    name: string,
    bankAccount: BankObj
}


const productsData = {
    products: [
        {
            name: 'Car',
            price: 8000
        },
        {
            name: 'Bike',
            price: 100
        }
    ]
}

let usersData = {
    users: [
        {
            userId: 1,
            name: 'Emad',
            bankAccount: {
                accountId: 1,
                cashBalance: 1000,
                creditBalance: 1000,
            },
        },
        {
            userId: 2,
            name: 'Mohammad',
            bankAccount: {
                accountId: 2,
                cashBalance: 2000,
                creditBalance: 2000,
            }
        }
    ]
}


let counter = 0


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
            'PUT': () => updateProductHandler(req, res),
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
    res.write(JSON.stringify({ 'visit counter': counter, 'products': productsData }))
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

        productsData.products.push(newProduct)
        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product added successfully', 'products': productsData }))

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
        for (let i = 0; i < productsData.products.length; i++) {
            if (productsData.products[i].name == body) {
                delete productsData.products[i]
                flag = true
                break
            }
        }

        if (flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product removed successfully', 'products': productsData }))
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
        for (let i = 0; i < productsData.products.length; i++) {
            if (productsData.products[i].name == JSONBody.name) {
                productsData.products[i].price = JSONBody.price
                flag = true
                break
            }
        }
        if (flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product updated successfully', 'products': productsData }))
        } else {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product Not found!' }))
        }

        res.end()
    });
}





function getUsersHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    counter++

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ 'visit counter': counter, 'products': usersData }))
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

        usersData.users.push(newUser)
        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product added successfully', 'products': usersData }))

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
        for (let i = 0; i < usersData.users.length; i++) {
            if (usersData.users[i].name == body) {
                delete usersData.users[i]
                flag = true
                break
            }
        }

        if (flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product removed successfully', 'products': usersData }))
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
        for (let i = 0; i < usersData.users.length; i++) {
            if (usersData.users[i].name == body) {
                bankDetails = usersData.users[i].bankAccount
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
        for (let i = 0; i < usersData.users.length; i++) {
            if (usersData.users[i].name == body.name) {
                if (body.type == 'cash') {
                    usersData.users[i].bankAccount.cashBalance += body.amount
                } else if (body.type == 'credit') {
                    usersData.users[i].bankAccount.creditBalance += body.amount
                }
                flag = true
                res.write(JSON.stringify({ 'visit counter': counter, 'bankDetails': usersData.users[i].bankAccount }))
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
        for (let i = 0; i < usersData.users.length; i++) {
            if (usersData.users[i].name == body.name) {
                if (body.type == 'cash') {
                    usersData.users[i].bankAccount.cashBalance -= body.amount
                } else if (body.type == 'credit') {
                    usersData.users[i].bankAccount.creditBalance -= body.amount
                }
                flag = true
                res.write(JSON.stringify({ 'visit counter': counter, 'bankDetails': usersData.users[i].bankAccount }))
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
        for (let i = 0; i < productsData.products.length; i++) {
            if (productsData.products[i].name == body.productName) {
                theProduct = productsData.products[i]
                flag = true
                break
            }
        }

        if (!flag) {
            res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product Not found!' }))
            res.end()
        }

        let flag2 = false
        for (let i = 0; i < usersData.users.length; i++) {
            if (usersData.users[i].name == body.username) {
                if (body.type == 'cash') {
                    usersData.users[i].bankAccount.cashBalance -= theProduct.price
                } else if (body.type == 'credit') {
                    usersData.users[i].bankAccount.creditBalance -= theProduct.price
                }
                flag2 = true
                res.write(JSON.stringify({ 'visit counter': counter, "message": `Payment succeded, you purchased a ${theProduct.price}`, 'bankDetails': usersData.users[i].bankAccount }))
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
