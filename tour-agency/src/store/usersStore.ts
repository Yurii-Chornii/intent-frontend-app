import {makeAutoObservable} from "mobx"
import {IUser} from "../interfaces/IUser";

class usersStore {
    users: IUser[] = []
    isAuth:boolean = false
    userIndex:number = 0
    user:string = "" 
    regisrationToggle:boolean = false       
    loginInput:string = ""
    passwordInput:string = ""


    constructor() {
        makeAutoObservable(this)
    }
   

    readLocalStorage() {

        
        if (localStorage.getItem('users') == null) { this.saveLocalStorage() }
        let localStorageValue:string|null = localStorage.getItem('users')
        let str1:string = typeof(localStorageValue) == 'string' ? localStorageValue : '{}'       
        this.users = JSON.parse(str1)
        this.isAuth = (localStorage.getItem('isAuth')) === 'false' ? false : true
        this.userIndex = Number(localStorage.getItem('userIndex'))
        
    }

    saveLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users) )
        localStorage.setItem('userIndex', this.userIndex.toString() )
        localStorage.setItem('isAuth', this.isAuth.toString() )
    }

    addUser(){

               
        let login:string = this.loginInput
        let password:string = this.passwordInput
         if (typeof(this.checkLogin(login)) == 'number') { 
             alert("Такий користувач вже зареєстрований") ;
             this.loginInput = ""
             return false
         }


        this.users.push({"login": login, "password": password, "cart": [] })
        this.loginInput = ""
        this.passwordInput = ""
        this.regisrationToggle = false            
        this.saveLocalStorage() 
        
    }

    regisrationToggleSwitch() {
      this.regisrationToggle = !this.regisrationToggle
    }
    
    loginTextChange(value:string){
        this.loginInput=value
    }
    passwordTextChange(value:string){
        this.passwordInput=value
    }

    checkLogin(login:string){
        let result:number|boolean = false
        this.users.forEach((item, index)=>{            
            if (item.login === login) {result = index}
        })
        return result
    }

    logIn(){
        let login:string = this.loginInput
        let password:string = this.passwordInput
        let index = this.checkLogin(login)        
         if (typeof(index) == 'number') {             
             if(this.users[index]['password'] === password ) {
                 this.userIndex = index
                 this.isAuth = true
                 this.saveLocalStorage()                 
                } else { alert("Не вірний логін або пароль") }  
            } else {  alert("Не вірний логін або пароль")  
         }
    }
    
    logOff(){
        this.isAuth = false
        this.userIndex = 0
        this.saveLocalStorage()
    }

    addTourToCart(id:number){
        console.log(id)
        console.log(this)

        console.log("lenght -- ",this.users[this.userIndex].cart.length)

        let arr = (this.users[this.userIndex].cart.push(id))
        console.log('arrr - ', arr)

        this.saveLocalStorage()
        
    }

    pushUserCart(id:number){
        console.log(this)
    }

}

export default new usersStore