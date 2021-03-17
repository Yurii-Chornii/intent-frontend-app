import {Link, useLocation} from "react-router-dom";
import {ITour} from "../../interfaces/ITour";
import "./Card.scss"
import Users from "../../store/Users";
import {useEffect, useState} from "react";


interface ICardProps {
    tour: ITour
}

export default function Card(props: ICardProps) {
    const [isInCart, setIsInCart] = useState(false);
    const {pathname} = useLocation();
    const {tour: {imageUrl, price, title, description, id}} = props;
    useEffect(() => {
        if (Users.loginedUser?.cart.findIndex(value => value === id) !== -1) {
            setIsInCart(true)
        }
    }, [id])
    return (
        <div className="card noselect">
            <div>
                <Link to={`${pathname}/${id}`}>
                    <img className="card__img" src={imageUrl} alt={title}/>
                </Link>
            </div>
            <div className="card__body">
                <h4 className="card__title">{title}</h4>
                <p>{
                    description.slice(0, description.indexOf(".") < 100 ? description.indexOf(".") + 1 : 100) + "..."
                }</p>
            </div>
            {/*<button onClick={() => Users.addNewItemToUserCart(id)}>add to cart</button>*/}
            <div className="card__footer">
                {
                    !isInCart ?
                        <i className="fas fa-cart-plus" onClick={() => {
                            Users.addNewItemToUserCart(id);
                            setIsInCart(true);
                        }}/>
                        :
                        <span>In cart</span>
                }

                <p>{price}</p>
            </div>
        </div>

    );
}
