"use strict";
exports.__esModule = true;
exports.handleRequest = void 0;
var products = [
    { "title": 'car', 'price': 8000 },
    { "title": 'bike', 'price': 2000 }
];
var users = [
    { "userId": 1, "name": 'Emad', "bankAccount": { "accountId": 1, "cashBalance": 1000, "creditBalance": 1000 } },
    { "userId": 2, "name": 'Mohammad', "bankAccount": { "accountId": 2, "cashBalance": 2000, "creditBalance": 2000 } },
];
var counter = 0;
var handleRequest = function (req, res) {
    var url = req.url;
    var method = req.method;
    var headers = req.headers;
    if (url === '/' && method === 'GET') {
        counter++;
        homeHandler(req, res);
    }
    else if (url === '/addProduct' && method === 'POST') {
        counter++;
        addProductHandler(req, res);
    }
    else if (url === '/allProducts' && method === 'GET') {
        counter++;
        getProductsHandler(req, res);
    }
    function homeHandler(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ 'message': 'Welcome to my server', 'visit counter': counter }));
        return res.end();
    }
    function getProductsHandler(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ 'visit counter': counter }));
        res.write(products.map(function (product) { return JSON.stringify(product); }));
        return res.end();
    }
    function addProductHandler(req, res) {
    }
};
exports.handleRequest = handleRequest;
