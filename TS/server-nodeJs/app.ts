import { server, port, data } from './server'

server.listen(port, (err) => {
    if (err) {
        console.log('Something went wrong', err)
    } else {
        console.log(`Listening to port ${port}`)
        data.push('Hello World')
        console.log(data)
    }
})

