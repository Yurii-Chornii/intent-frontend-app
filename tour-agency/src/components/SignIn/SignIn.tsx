import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import Users from "../../store/Users";
import "./SignIn.scss";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Col, Modal} from "react-bootstrap";
import data from "../../store/Data"


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

    const getUserBalance = async () => {
        const response = await fetch('http://localhost:8765/api/users/' + Users.loginedUserDB?.id)
            .then(value => value.json())
            .then(value => value)
            .catch(e => console.log(e))
        if (response.balance){
            Users.setUserBalance(response.balance)
        }
    }

    useEffect(() => {
        let loginedUser = localStorage.getItem("loginedUser");
        if(loginedUser !== null){
            loginedUser = JSON.parse(loginedUser);
            Users.setLoginedUserDB(loginedUser);
            Users.setSignInPageView("Logined");
            getUserBalance()
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
                Users.setUserBalance(foundUser.balance)
                history.push("/tours");
            }
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
                Users.setUserBalance(foundUser.balance)
                history.push("/tours");
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

    const logOut = async () => {
        await fetch(`http://localhost:8765/api/users/signout?userid=${Users.loginedUserDB?.id}`)
            .then(value => {
                setSignInFormValidated(false);
                setSignUpFormValidated(false);
                Users.clearLoginedUserDb();
                Users.setSignInPageView("SignIn");
                Users.deleteUserFromLocalstorage();
                Users.setUserCartItemsIds([]);
                Users.setUserCartItemsFull([]);
                data.setSortOrder("id");
                data.setMinPrice(0);
                data.setMaxPrice(5000);
                data.setPage(1);
                data.setPageSize(6);
            })
            .catch(e => console.log(e))
    }

    return (
        <div className="signIn">
            <header className="signIn__header mb-3">
                <h2>{Users.signInPageView}</h2>
                {modal}
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
                                    pattern= "[A-Za-zЄ-ЯҐа-їґ -]*"
                                    // pattern="^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
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
                                    pattern= "[A-Za-zЄ-ЯҐа-їґ -]*"
                                    // pattern="^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
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
