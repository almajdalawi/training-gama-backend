import * as dotenv from 'dotenv'
import { Request, Response } from 'express';
import { BaseHandler } from './baseHandler'
import { reqResErrorEventListener } from '../utils/EreqReserrorEventListener'
import { genericResponseMessage } from '../utils/responseSerializer'
import { IResponce } from '../interfaces/app-interfaces'
import { isLargeFile } from '../utils/isLargFile'
import { isCorrectFields } from '../utils/isCorrectFields'
import { sendResponse } from '../utils/sendResponse';


dotenv.config()
const port: string = process.env.PORT ? process.env.PORT.toString() : '0'


export class UserHandler extends BaseHandler {
    constructor(private req: Request, private res: Response) {
        super()
        this.req = req
        this.res = res
    }

    async get() {
        global.counter++

        reqResErrorEventListener(this.req, this.res)

        // get products using graphQL
        let fetched = await fetch(`http://localhost:${port}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                    getUsers{
                        name
                        bankAccount{cashBalance creditBalance}
                    }
                }`
            }),
        }).then(res => res.json())

        let serialized: IResponce = genericResponseMessage(200, 'Successfull', global.counter, fetched)
        sendResponse(this.res, serialized)
    }


    async post() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name')

            // post users using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{
            createUser(nameArg:$nameVar){
              name
              bankAccount{
                cashBalance
                creditBalance
                   }
               }
            }`,
                    variables: {
                        nameVar: body.name,
                    }
                }),
            }).then(res => res.json())

            let serialized: IResponce = genericResponseMessage(200, 'User added successfully', global.counter, fetched)
            sendResponse(this.res, serialized)
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }

    async delete() {
        global.counter++

        try {
            let body = this.req.body
            isLargeFile(body.toString())
            isCorrectFields(body, 'name')

            // delete users using graphQL
            let fetched = await fetch(`http://localhost:${port}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{
                deleteUser(nameArg:$nameVar){
                 name
                }
            }`,
                    variables: {
                        nameVar: body.name
                    }
                }),
            }).then(res => res.json())


            if (!fetched.data) {
                let serialized: IResponce = genericResponseMessage(200, 'User Not found!', global.counter, {})
                sendResponse(this.res, serialized)
            } else {
                let serialized: IResponce = genericResponseMessage(200, 'User removed successfully', global.counter, fetched)
                sendResponse(this.res, serialized)
            }
        } catch (err: any) {
            let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
            sendResponse(this.res, serialized)
        }
    }


    patch(): void { }
}
