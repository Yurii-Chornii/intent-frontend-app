import {makeAutoObservable} from "mobx";
import {IUser} from "../interfaces/IUser";
import {ITour} from "../interfaces/ITour";
import Data from "./Data";

class Users {
    users: IUser[] = [
        {
            id: 1,
            login: "admin",
            password: "admin",
            cart: [1, 2, 10]
        },
        {
            id: 2,
            login: "root",
            password: "root",
            cart: [3, 25, 19]
        }
    ];
    signInPageView: string = "SignUp";
    isSignedIn: boolean = false;
    loginedUser: IUser | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setSignInPageView(newView: string): void {
        this.signInPageView = newView;
    }

    setIsSignedIn(status: boolean): void {
        this.isSignedIn = status;
    }

    setLoginedUser(user: IUser | undefined): void {
        this.loginedUser = user;
    }

    //sign in
    signIn(login: string, password: string): boolean {
        const foundUser = this.users.find(value => value.login === login);
        if (foundUser) {
            if (foundUser.login === login) {
                this.setIsSignedIn(true);
                this.setLoginedUser(foundUser);
                this.setSignInPageView("Logined");
                return true;
            }
        }
        return false
    }


    //sign up
    signUp(login: string, password: string): boolean {
        const foundUser = this.users.find(value => value.login === login);
        if(foundUser) return false;
        const newUser: IUser = {
            id: new Date().getTime(),
            login,
            password,
            cart: []
        }
        this.users.push(newUser);
        this.setSignInPageView("SignIn");
        return true;
    }

    get LoginedUserCartTours() {
        const cartTours: ITour[] = [];
        if (this.loginedUser){
            if (this.loginedUser.cart.length > 0){
                this.loginedUser.cart.forEach(value => {
                    const foundedTour = Data.allToursReadonly.find(item => item.id === value);
                    if (foundedTour) cartTours.push(foundedTour)
                })
            }
        }
        return cartTours
    }

    addNewItemToUserCart(id: number): void{
        if (this.loginedUser){
            // this.loginedUser?.cart.push(id);
            this.users = this.users.map(user => {
                if (user.id === this.loginedUser?.id){
                    user.cart.push(id)
                }
                return user
            })
        }
    }

    deleteItemFromCart(id: number): void{
        this.users = this.users.map(user => {
            if (user.id === this.loginedUser?.id){
                user.cart = user.cart.filter(item => item !== id)
            }
            return user
        })
    }

    clearCart(): void{
        this.users = this.users.map(user => {
            if (user.id === this.loginedUser?.id){
                user.cart = []
            }
            return user
        })
    }
    // get totalCartPrice() {
    //     let totalPrice = 0;
    //     const itemsInCart = this.LoginedUserCartTours;
    //     for (let item of itemsInCart){
    //         totalPrice += +item.price
    //     }
    //     return totalPrice;
    // }
}

export default new Users();
