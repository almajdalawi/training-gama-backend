import { IBaseHandler } from '../interfaces/app-interfaces'


export abstract class BaseHandler implements IBaseHandler {

    abstract get(_: any, args: object): any

    abstract post(_: any, args: object): any

    abstract delete(_: any, args: object): any

    abstract patch(_: any, args: object): any
}