import "./Cart.scss"
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import Users from "../../store/Users";
import {Link, useHistory} from "react-router-dom";
import CartItem from "../CartItem/CartItem";

const Cart = observer(() => {
    const history = useHistory();
    useEffect(() => {
        if (!Users.loginedUser) history.push("/");
    }, [history])

    const toursInCart = Users.LoginedUserCartTours;
    let total = 0;
    for (let tour of toursInCart){
        total += Number.parseInt(tour.price);
    }

    return (
        <div>
            <Link to="/tours">
                <button className="btn btn-success">back to list</button>
            </Link>
            <div className="cart">
                <header className="cart__header">
                    <h2>Cart</h2>
                </header>
                {
                    Users.LoginedUserCartTours.length > 0 ?
                        <section>
                            {Users.LoginedUserCartTours.map(item => <CartItem key={item.id} id={item.id} title={item.title} description={item.description} price={item.price} imageUrl={item.imageUrl}/>)}
                        </section>
                        :
                        <section>
                            <h3>Your cart is empty</h3>
                        </section>
                }
                {
                    Users.LoginedUserCartTours.length > 0 &&
                    <footer className="cart__footer">
                        <div>
                            <p className="cart__footer__clear-cart" onClick={() => {Users.clearCart()}}>clear cart</p>
                            <p>Total price: {total}$</p>
                            <button className="btn btn-success" onClick={()=> {
                                alert("Thank you for your order! Have a nice day!");
                                Users.clearCart();
                            }}>Buy tours</button>
                        </div>
                    </footer>
                }

            </div>
        </div>

    );
})

export default Cart;
