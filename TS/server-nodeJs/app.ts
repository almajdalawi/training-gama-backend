
import * as http from 'http'
import { json } from 'stream/consumers'
import { Product } from '../payment-typescript/payment'

interface ProductObj {
    title: string,
    price: number
}

interface BankObj {
    accountId: number,
    cashBalance: number,
    creditBalance: number,
}


const productsData = {
    'products': [
        {
            title: 'Car',
            price: 8000
        },
        {
            title: 'Bike',
            price: 100
        }
    ]
}

let usersData = {
    'users': [
        {
            "userId": 1,
            "name": 'Emad',
            "bankAccount": {
                "accountId": 1,
                "cashBalance": 1000,
                "creditBalance": 1000,
            },
        },
        {
            "userId": 2,
            "name": 'Mohammad',
            "bankAccount": {
                "accountId": 2,
                "cashBalance": 2000,
                "creditBalance": 2000,
            }
        }
    ]
}


let counter = 0


export const handleRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const url: string | undefined = req.url
    const method: string | undefined = req.method
    const headers: http.IncomingHttpHeaders = req.headers

    if (url === '/' && method === 'GET') {
        counter++
        homeHandler(req, res)
    }
    else if (url === '/allProducts' && method === 'GET') {
        counter++
        getProductsHandler(req, res)
    }
    else if (url === '/addProduct' && method === 'POST') {
        counter++
        addProductHandler(req, res)
    }
    else if (url === '/deleteProduct' && method === 'DELETE') {
        counter++
        deleteProductHandler(req, res)
    }
    else if (url === '/updateProduct' && method === 'PUT') {
        counter++
        updateProductHandler(req, res)
    }
    else {
        counter++
        notFoundHandler(req, res)
    }
}

function homeHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Welcome to my server' }))
    return res.end()
}

function getProductsHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ 'visit counter': counter, 'products': productsData }))
    return res.end()
}

function addProductHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        productsData.products.push(body)
        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product added successfully', 'products': productsData }))

        res.end()
    });
}

function deleteProductHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        for (let i = 0; i < productsData.products.length; i++) {
            if (productsData.products[i].title == body) {
                delete productsData.products[i]
            }
        }

        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product removed successfully', 'products': productsData }))

        res.end()
    });
}

function updateProductHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    let body: any = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        res.on('error', (err) => {
            console.error(err);
        });
        res.writeHead(200, { 'Content-Type': 'application/json' })

        let JSONBody = JSON.parse(body)
        for (let i = 0; i < productsData.products.length; i++) {
            console.log(productsData.products[i].title, JSONBody.title, productsData.products[i].title == JSONBody.title)
            if (productsData.products[i].title == JSONBody.title) {
                productsData.products[i].price = JSONBody.price
            }
        }

        res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Product removed successfully', 'products': productsData }))

        res.end()
    });
}

function notFoundHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ 'visit counter': counter, 'message': 'Not Found' }))
    return res.end()
}
