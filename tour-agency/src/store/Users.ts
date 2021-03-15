import {makeAutoObservable} from "mobx";
import {IUser} from "../interfaces/IUser";

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

}

export default new Users();
