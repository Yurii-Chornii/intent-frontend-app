import {makeAutoObservable} from "mobx";
import {ITour} from "../interfaces/ITour";
import {IUserDB} from "../interfaces/IUserDB";

class Users {
    signInPageView: string = "SignUp";
    loginedUserDB: IUserDB | undefined = undefined;
    userCartItemsIds: number[] = [];
    userCartItemsFull: ITour[] = [];
    userBalance: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setUserCartItemsIds(ids: number[]) {
        this.userCartItemsIds = ids;
    }

    signIn = (user: IUserDB) => {
        this.setLoginedUserDB(user);
        this.setSignInPageView("Logined");
        this.saveUserToLocalstorage(user);
    }

    saveUserToLocalstorage = (user: IUserDB): void => {
        localStorage.setItem("loginedUser", JSON.stringify(user))
    }

    deleteUserFromLocalstorage = (): void => {
        localStorage.removeItem("loginedUser")
    }

    isItemInCart = (itemId: number): boolean => this.userCartItemsIds.includes(itemId);

    addToCart = async (tourId: number, price: number) => {
        await fetch(`http://localhost:8765/api/users/cart/add?` +
            `userid=${this.loginedUserDB?.id}` +
            `&tourid=${tourId}` +
            `&price=${price}`)
            .then(value => value.json())
            .then(value => {
                this.getUserCartItems()
                return value
            })
            .catch(reason => console.error(reason))
    }

    removeFromCart = async (tourId: number) => {
        await fetch(`http://localhost:8765/api/users/cart/delete?` +
            `userid=${this.loginedUserDB?.id}` +
            `&tourid=${tourId}`)
            .then(value => value.json())
            .then(value => value)
            .catch(reason => console.error(reason))
            .finally(() => {
                this.getUserCartItems()
            })
    }

    getUserCartItems = async () => {
        const userCartItems = await fetch('http://localhost:8765/api/users/tours/' + this.loginedUserDB?.id)
            .then(value => value.json())
            .then(value => value)
            .catch(e => console.error(e))
        if (Array.isArray(userCartItems)) {
            if (this.userCartItemsIds.length !== userCartItems.length) this.setUserCartItemsIds(userCartItems)
        }
    }

    setSignInPageView(newView: string): void {
        this.signInPageView = newView;
    }

    setLoginedUserDB(user: any): void {
        this.loginedUserDB = user;
    }

    setUserBalance(balance: number): void {
        this.userBalance = balance;
    }

    clearLoginedUserDb(): void {
        this.loginedUserDB = undefined;
    }

    setUserCartItemsFull(items: ITour[]): void {
        this.userCartItemsFull = items;
    }

    getLoginedUserCartTours = async () => {
        const response = await fetch('http://localhost:8765/api/tours/userid/' + this.loginedUserDB?.id)
            .then(value => value.json())
            .then(value => value)
            .catch(reason => console.error(reason))
        if (Array.isArray(response)) {
            if (response.length !== this.userCartItemsFull.length) this.setUserCartItemsFull(response)
        }
    }

    cleanCart = async () => {
        await fetch('http://localhost:8765/api/users/cart/clean?userid=' + this.loginedUserDB?.id)
            .then(value => value.json())
            .then(value => value)
            .catch(reason => console.error(reason))
            .finally(() => {
                this.setUserCartItemsFull([])
                this.setUserCartItemsIds([])
            })
    }
}

export default new Users();
