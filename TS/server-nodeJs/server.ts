import * as http from 'http'
import * as app from './app'

const port: number = 3000


const server: http.Server = http.createServer(app.handleRequest).listen(port)