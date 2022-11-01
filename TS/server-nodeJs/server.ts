import * as http from 'http'
import * as dotenv from 'dotenv'
import * as app from './app'


dotenv.config()

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 0


const server: http.Server = http.createServer(app.handleRequest).listen(port)