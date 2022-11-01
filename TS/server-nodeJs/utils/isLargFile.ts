import * as http from 'http'
import { LargeFileErr } from './EreqReserrorEventListener'


export function isLargeFile(body: string) {
    if (body.length > 100) { throw new LargeFileErr('Body size limit exceeded!') }
}
