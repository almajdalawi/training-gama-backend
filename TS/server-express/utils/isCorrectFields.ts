import { LargeFileErr } from "./EreqReserrorEventListener"

export function isCorrectFields(theJSON: any, ...args: any) {
    let wantedFields: string[] = []
    args.forEach((field: string) => {
        wantedFields.push(field)
    })

    let fields = Object.keys(theJSON)
    let flage: boolean = true

    if (fields.length == wantedFields.length) {
        wantedFields.forEach((field: string) => {
            if (!(fields.includes(field))) { flage = false }
        })
    } else { flage = false }

    if (!flage) {
        throw new LargeFileErr(`The entered fields are wrong! please enter the following: ${wantedFields}`)
    }
}