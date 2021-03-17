import {observer} from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import Users from "../../store/Users";
import "./SignIn.scss";

const SignIn = observer(() => {
    const history = useHistory();


    return (
        <div className="signIn">
            <header className="signIn__header">
                <h2>{Users.signInPageView}</h2>
            </header>
            {Users.signInPageView === "SignUp" && (
                <section>
                    <form onSubmit={(e: any) => {
                        e.preventDefault();
                        const login = e.target[0].value;
                        const password = e.target[1].value;
                        if (!login || !password) alert("No login or password")
                        else {
                            const success = Users.signUp(login, password);
                            if (!success) alert("This login is occupated")
                        }

                    }}>
                        <input type="text" placeholder="login"/>
                        <input type="password" placeholder="password"/>
                        <button>sign up</button>
                        <p>
                            Already have an account?
                            <b onClick={() => Users.setSignInPageView("SignIn")}> Sign In</b>
                        </p>
                    </form>
                </section>
            )}
            {Users.signInPageView === "SignIn" && (
                <section>
                    <form onSubmit={(e: any) => {
                        e.preventDefault();
                        const login = e.target[0].value;
                        const password = e.target[1].value;
                        if (!login || !password) alert("No login or password")
                        else {
                            const success = Users.signIn(login, password);
                            if (!success) alert("Wrong login or password")
                            else history.push("/tours")
                        }

                    }}>
                        <input type="text" placeholder="login"/>
                        <input type="password" placeholder="password"/>
                        <button>sign in</button>
                        <p>
                            Don't have an account?
                            <b onClick={() => Users.setSignInPageView("SignUp")}> Sign Up</b>
                        </p>
                    </form>
                </section>
            )}
            {Users.signInPageView === "Logined" && (
                <section>
                    <p>You are logined as <b>{Users.loginedUser?.login}</b></p>
                    <button onClick={() => {
                        Users.setLoginedUser(undefined);
                        Users.setIsSignedIn(false);
                        Users.setSignInPageView("SignIn");
                    }}>log out</button>
                    <button onClick={()=> history.push("/tours")}>tours list</button>
                </section>
            )}

        </div>
    );
})

export default SignIn;
