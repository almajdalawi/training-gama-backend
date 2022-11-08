import { IBaseHandler, IGet, IGetRes, IPost, IPostRes, IDelete, IDeleteRes, IPatch, IPatchRes } from '../shared/interfaces'


export abstract class BaseHandler implements IBaseHandler {

    abstract get(_: any, args: IGet): IGetRes

    abstract post(_: any, args: IPost): IPostRes

    abstract delete(_: any, args: IDelete): IDeleteRes

    abstract patch(_: any, args: IPatch): IPatchRes
}