"use strict";
exports.__esModule = true;
exports.server = void 0;
var http = require("http");
var app = require("./app");
var port = 3000;
exports.server = http.createServer(app.handleRequest).listen(port);
