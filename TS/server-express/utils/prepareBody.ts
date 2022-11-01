import * as http from 'http'

export function prepareBody(body: any): any {
    body = Buffer.concat(body).toString();
    body = JSON.parse(body)
    return body
}