import * as http from 'http'

export function EreqReserrorEventListener(req: http.IncomingMessage, res: http.ServerResponse) {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });

    res.on('error', (err) => {
        console.error(err);
    });

}