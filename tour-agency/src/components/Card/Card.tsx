import {Link, useLocation} from "react-router-dom";
import {ITour} from "../../interfaces/ITour";
import usersStore from "../../store/usersStore"
import "./Card.scss"


interface ICardProps {
    tour: ITour,
    isAuth: boolean
    addToCart(id:number): any
    
}

export default function Card(props: ICardProps) {
    const {pathname} = useLocation();
    const {tour: {imageUrl, price, title, description, id}, isAuth, addToCart} = props;
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
            <div className="card__footer">
                <div>
            {isAuth && 
                    <button onClick={() => addToCart.call(usersStore, id)}> <i className="fas fa-shopping-cart"/> Add to cart</button>                      
            }
            </div>
                <p>{price}</p>
            </div>
            
        </div>

    );
}
