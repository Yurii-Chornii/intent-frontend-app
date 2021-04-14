import {IItemDB} from "./IItemDB";

export interface IUserDB{
    balance: number,
    id: number,
    items: IItemDB[],
    password: string,
    secretKey: string,
    userName: string
}
