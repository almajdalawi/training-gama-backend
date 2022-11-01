import { IBaseHandler } from '../interfaces/app-interfaces'


export abstract class BaseHandler implements IBaseHandler {

    abstract get(): void

    abstract post(): void

    abstract delete(): void

    abstract patch(): void
}