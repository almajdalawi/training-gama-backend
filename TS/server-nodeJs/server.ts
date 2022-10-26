import * as http from 'http'
import * as app from './app'

export const port: number = 3000


export const server: http.Server = http.createServer(app.handleRequest).listen(port)