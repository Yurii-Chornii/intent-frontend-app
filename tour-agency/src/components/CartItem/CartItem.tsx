import "./CartItem.scss"
import {ITour} from "../../interfaces/ITour";
import {observer} from "mobx-react-lite";
import Users from "../../store/Users";
import {useHistory} from "react-router-dom";



const CartItem = observer((props: ITour) => {
    const {id, imageUrl, price, title} = props;
    const history = useHistory();
    return (
        <div className="cart-item">
            <div className="cart-item__img-box">
                <img src={imageUrl} alt={title} onClick={() => {history.push(`/tours/${id}`)}}/>
            </div>
            <div className="cart-item__body">
                <h3>{title}</h3>
                <p>{price}</p>
            </div>
            <span className="cart-item__delete" onClick={() => {
                Users.deleteItemFromCart(id);
            }}>
                <i className="fas fa-trash"/>
            </span>
        </div>
    );
})

export default CartItem;
