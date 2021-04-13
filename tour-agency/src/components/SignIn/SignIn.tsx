import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import Users from "../../store/Users";
import "./SignIn.scss";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Col, Modal} from "react-bootstrap";
import {IUserDB} from "../../interfaces/IUserDB";

const SignIn = observer(() => {
    const history = useHistory();

    const [signInFormValidated, setSignInFormValidated] = useState(false);
    const [signUpFormValidated, setSignUpFormValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalBody, setModalbody] = useState("");

    const modalRef = useRef(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let loginedUser = localStorage.getItem("loginedUser");
        if(loginedUser !== null){
            loginedUser = JSON.parse(loginedUser);
            Users.setLoginedUserDB(loginedUser);
            Users.setSignInPageView("Logined")
        }
    }, [])

    const handleSignInForm = async (event: any) => {
        const signInForm = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (signInForm.checkValidity() === true) {
            const login = signInForm.login.value;
            const password = signInForm.password.value;
            const foundUser = await fetch('http://localhost:8765/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    userName: login,
                    password: password
                })
            }).then(value => value.json())
                .then(value => value)
                .catch(e => console.error(e))

            if (foundUser !== undefined && "message" in foundUser && foundUser.message){
                showModal("Warning", foundUser.message)
            }else if(foundUser === undefined){
                showModal("Warning", "Try again")
            }else {
                Users.signIn(foundUser);
            }
            // const success = Users.signIn(login, password);
            // if (!success) showModal("Something went wrong", "Please check your login and password!")
            // else history.push("/tours")
        }
        setSignInFormValidated(true);
    };

    const showModal = (headerText: string, bodyText: string): void => {
        setModalHeader(headerText);
        setModalbody(bodyText)
        handleShow();
    }

    const handleSignUpForm = async (event: any) => {
        const signUpForm = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (signUpForm.checkValidity() === true) {
            const login = signUpForm.login.value;
            const password = signUpForm.password.value;

            const foundUser = await fetch('http://localhost:8765/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    userName: login,
                    password: password
                })
            }).then(value => value.json())
                .then(value => value)
                .catch(e => console.error(e))

            if (foundUser !== undefined && "message" in foundUser && foundUser.message){
                showModal("Warning", foundUser.message)
            }else if(foundUser === undefined){
                Users.setSignInPageView("SignIn")
            }else {
                Users.signIn(foundUser);
            }
        }
        setSignUpFormValidated(true);
    };

    const modal = <Modal ref={modalRef} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

    // //todo
    // const getData = async () => {
    //     await fetch("http://localhost:8765/api/tours/?page=1&size=9").then(value => value.json()).then(value => console.log(value))
    // }

    const logOut = async () => {
        await fetch(`http://localhost:8765/api/users/signout?userid=${Users.loginedUserDB?.id}`)
            .then(value => value.json())
            .then(value => {
                console.log(value)

            })
            .catch(e => console.log(e))
        Users.clearLoginedUserDb();
        Users.setSignInPageView("SignIn");
        Users.deleteUserFromLocalstorage();
    }

    return (
        <div className="signIn">
            <header className="signIn__header mb-3">
                <h2>{Users.signInPageView}</h2>
                {modal}


                {/*<button onClick={() => {*/}
                {/*    getData()*/}
                {/*}}>test</button>*/}


            </header>
            {Users.signInPageView === "SignUp" && (
                <section>
                    <Form noValidate validated={signUpFormValidated} onSubmit={handleSignUpForm}>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="signUpFormValidation01">
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    required
                                    name="login"
                                    type="text"
                                    placeholder="Login"
                                    pattern="^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
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
                                    name="password"
                                    placeholder="Password"
                                    pattern="^.{4,20}$"
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
                                    name="login"
                                    type="text"
                                    placeholder="Login"
                                    pattern="^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
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
                                    name="password"
                                    placeholder="Password"
                                    pattern="^.{4,20}$"
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
                    <p>You are logined as <b>{Users.loginedUserDB?.userName}</b></p>
                    <Button variant="danger" onClick={() => {
                        logOut();
                    }}>Log out</Button>
                    <Button className="ml-2" variant="success" onClick={() => history.push("/tours")}>Tours
                        list</Button>
                </section>
            )}

        </div>
    );
})

export default SignIn;
