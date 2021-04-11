import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import Users from "../../store/Users";
import "./SignIn.scss";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Col} from "react-bootstrap";

const SignIn = observer(() => {
    const history = useHistory();

    const [signInFormValidated, setSignInFormValidated] = useState(false);
    const [signUpFormValidated, setSignUpFormValidated] = useState(false);

    const handleSignInForm = (event: any) => {
        const signInForm = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (signInForm.checkValidity() === true) {
            const login = signInForm.login.value;
            const password = signInForm.password.value;
            const success = Users.signIn(login, password);
            if (!success) alert("Something went wrong")
            else history.push("/tours")

        }
        setSignInFormValidated(true);
    };

    const handleSignUpForm = (event: any) => {
        const signUpForm = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (signUpForm.checkValidity() === true) {
            const login = signUpForm.login.value;
            const password = signUpForm.password.value;
            const success = Users.signUp(login, password);
            if (!success) alert("This login is occupated")

        }
        setSignUpFormValidated(true);
    };

    return (
        <div className="signIn">
            <header className="signIn__header mb-3">
                <h2>{Users.signInPageView}</h2>
            </header>
            {Users.signInPageView === "SignUp" && (
                <section>
                    <Form noValidate validated={signUpFormValidated} onSubmit={handleSignUpForm}>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="signUpFormValidation01">
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    required
                                    name = "login"
                                    type="text"
                                    placeholder="Login"
                                    pattern = "^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Invalid login.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="signUpFormValidation02">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    name = "password"
                                    placeholder="Password"
                                    pattern = "^.{4,20}$"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    The password must be between 4 and 20 characters long!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" variant="success">Submit</Button>
                        <p className="mt-3">
                            Already have an account?
                            <b onClick={() => Users.setSignInPageView("SignIn")}> Sign In</b>
                        </p>
                    </Form>

                </section>
            )}
            {Users.signInPageView === "SignIn" && (
                <section>
                    <Form noValidate validated={signInFormValidated} onSubmit={handleSignInForm}>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    required
                                    name = "login"
                                    type="text"
                                    placeholder="Login"
                                    pattern = "^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Invalid login.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    name = "password"
                                    placeholder="Password"
                                    pattern = "^.{4,20}$"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    The password must be between 4 and 20 characters long!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" variant="success">Submit</Button>
                        <p className="mt-3">
                            Don't have an account?
                            <b onClick={() => Users.setSignInPageView("SignUp")}> Sign Up</b>
                        </p>
                    </Form>
                </section>
            )}
            {Users.signInPageView === "Logined" && (
                <section>
                    <p>You are logined as <b>{Users.loginedUser?.login}</b></p>
                    <Button variant="danger" onClick={() => {
                        Users.setLoginedUser(undefined);
                        Users.setIsSignedIn(false);
                        Users.setSignInPageView("SignIn");
                    }}>Log out</Button>
                    <Button className="ml-2" variant="success" onClick={()=> history.push("/tours")}>Tours list</Button>
                </section>
            )}

        </div>
    );
})

export default SignIn;
