import * as http from 'http'

export function reqResErrorEventListener(req: http.IncomingMessage, res: http.ServerResponse) {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });

    res.on('error', (err) => {
        console.error(err);
        res.statusCode = 500;
        res.end();
    });

}

export function reqError(res: http.ServerResponse, err: Error): void {
    console.error(err);
    res.statusCode = 400;
    res.end();
}

export function resError(res: http.ServerResponse, err: Error): void {
    console.error(err);
    res.statusCode = 500;
    res.end();
}