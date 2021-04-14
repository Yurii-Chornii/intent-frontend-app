import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import Users from "../../store/Users";
import {Link, useHistory} from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Cart.scss"

const Cart = observer(() => {
    const [show, setShow] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalBody, setModalbody] = useState("");
    const history = useHistory();
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        if (!Users.loginedUserDB) history.push("/");
    }, [history])

    useEffect(() => {
        Users.getLoginedUserCartTours();
        const totalPrice = Users.userCartItemsFull.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.price
        }, 0)
        setTotalPrice(totalPrice);
    }, [Users.userCartItemsFull, Users.userCartItemsIds])

    const buyAllTours = async () => {
        const response = await fetch('http://localhost:8765/api/users/cart/buy?userid=' + Users.loginedUserDB?.id)
            .then(value => value.json())
            .then(value => value)
            .catch(e => console.error(e))
        if ("message" in response && response.message) {
            showModal("Ups...", response.message);
        } else {
            Users.setUserBalance(response.balance);
            Users.setUserCartItemsIds(response.items)
            Users.setUserCartItemsFull(response.items)
            showModal("Congrats", "Have a nice rest!");
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showModal = (headerText: string, bodyText: string): void => {
        setModalHeader(headerText);
        setModalbody(bodyText)
        handleShow();
    }

    const modal = <Modal show={show} onHide={handleClose}>
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

    return (
        <div>
            <Link to="/tours">
                <button className="btn btn-success m-3">back to list</button>
            </Link>
            <div className="cart">
                <header className="cart__header">
                    <h2>Cart</h2>
                    {modal}
                </header>
                {
                    Users.userCartItemsFull.length > 0 ?
                        <section>
                            {Users.userCartItemsFull.map(item => <CartItem key={item.id} id={item.id} title={item.title}
                                                                           description={item.description}
                                                                           price={item.price}
                                                                           imageUrl={item.imageUrl}/>)}
                        </section>
                        :
                        <section>
                            <h3>Your cart is empty</h3>
                        </section>
                }
                {
                    Users.userCartItemsFull.length > 0 &&
                    <footer className="cart__footer">
                        <div>
                            <p className="cart__footer__clear-cart" onClick={() => {
                                Users.cleanCart()
                            }}>clean cart</p>
                            <p>Total price: {totalPrice}$</p>
                            <p>Balance: {Users.userBalance}$</p>
                            <button className="btn btn-success" onClick={() => {
                                buyAllTours()
                            }}>Buy tours
                            </button>
                        </div>
                    </footer>
                }
            </div>
        </div>
    );
})

export default Cart;
