import * as http from 'http'

export const port: number = 3000
export let data: string[] = []

let counter = 0

export const server: http.Server = http.createServer((req, res) => {
    counter++

    let endPoint: string | undefined = req.url

    if (endPoint == '/') {
        res.write('Hello World ' + counter)
        res.write(data.toString())
        res.end()
    } else if (endPoint == '/contact') {
        res.write('Contact us ' + counter)
        res.end()
    } else {
        res.write('Not Found ' + counter)
        res.end()
    }
})
