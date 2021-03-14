import "./SignIn.scss";
import {useEffect} from "react"
import {observer} from "mobx-react-lite"
import usersStore from "../../store/usersStore"

const SignIn = observer(() => {

    useEffect(()=>{        
        usersStore.readLocalStorage()
    },[])


    return (
        <div>
            {(usersStore.isAuth === false) && 
            <div>
                { !usersStore.regisrationToggle ? <span onClick={()=>usersStore.regisrationToggleSwitch()}> Новий користувач </span> : <span onClick={()=>usersStore.regisrationToggleSwitch()}> Відмінити реєстрацію [х] </span>}
                <input type="text" placeholder=" Логін " value={usersStore.loginInput} onChange={(event)=>{usersStore.loginTextChange(event.target.value)}} />
                <input type="password" placeholder=" Пароль " value={usersStore.passwordInput} onChange={(event)=>{usersStore.passwordTextChange(event.target.value)}} />
                { !usersStore.regisrationToggle ? <button onClick={()=>usersStore.logIn()}> Увійти </button> : <button onClick={()=>usersStore.addUser()}> Зареєструвати </button> }
            </div>}
            {(usersStore.isAuth === true) && 
            <div>
                <span> {usersStore.users[usersStore.userIndex]["login"]} </span>
                <button onClick={()=>usersStore.logOff()}> Вийти </button>                                   
            </div>}
        </div>
    );
})


export default SignIn