import "./SignIn.scss";
import {Route, Switch, Link} from "react-router-dom";
import {useEffect} from "react"
import {observer} from "mobx-react-lite"
import usersStore from "../../store/usersStore"
import {ITour} from "../../interfaces/ITour";
import Data from "../../store/Data"
import Cart from "./cart"

const SignIn = observer(() => {

    useEffect(()=>{        
        usersStore.readLocalStorage()
    },[])
    //let length:number = 0
    //length = (usersStore.users[usersStore.userIndex].cart.length) ? usersStore.users[usersStore.userIndex].cart.length : 0
    //let toursInCart:ITour[] = Data.tours


    //let toursInCart:ITour[] = usersStore.users[usersStore.userIndex].cart.map((item:number)=>Data.tours[item]) 
    //let a:number[] = []
    //console.log("cccdddeee - ", usersStore.users[usersStore.userIndex].cart[0])

    //  for(let i=0; i<usersStore.users[usersStore.userIndex].cart.length; i++ ) {
    //      a[i] = usersStore.users[usersStore.userIndex].cart[i]
    //  }

    //  let toursInCart:ITour[] = a.map(item => Data.tours[item]) 

    // console.log("aaa ",a)
        // console.log(toursInCart)

    //console.log(usersStore.users[usersStore.userIndex].cart)

    return (
        <div className="headerline">
            <div>
                {(usersStore.isAuth === false) && 
                <div>
                    { !usersStore.regisrationToggle ? <span onClick={()=>usersStore.regisrationToggleSwitch()}> Зареєструватись </span> : <span onClick={()=>usersStore.regisrationToggleSwitch()}> Відмінити реєстрацію [х] </span>}
                    <input type="text" placeholder=" Логін " value={usersStore.loginInput} onChange={(event)=>{usersStore.loginTextChange(event.target.value)}} />
                    <input type="password" placeholder=" Пароль " value={usersStore.passwordInput} onChange={(event)=>{usersStore.passwordTextChange(event.target.value)}} />
                    { !usersStore.regisrationToggle ? <button onClick={()=>usersStore.logIn()}> Увійти </button> : <button onClick={()=>usersStore.addUser()}> Зареєструвати </button> }
                </div>}
                {(usersStore.isAuth === true) && 
                <div>
                    <Link to="/cart">
                        <div className="cart">                    
                            <i className="fas fa-shopping-cart"/>
                            <span className="pcsInCart">{usersStore.users[usersStore.userIndex].cart.length}</span> 
                            {/* <Cart tours={toursInCart} /> */}
                        </div> 
                    </Link>                                                           
                    <span> {usersStore.users[usersStore.userIndex]["login"]} |</span>
                    <span onClick={()=>usersStore.logOff()}> Вийти </span>                    
                </div>}
            </div>
        </div>
    );
})


export default SignIn