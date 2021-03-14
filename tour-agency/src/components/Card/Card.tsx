import {Link, useLocation} from "react-router-dom";
import {ITour} from "../../interfaces/ITour";
import "./Card.scss"


interface ICardProps {
    tour: ITour,
    isAuth: boolean
}

export default function Card(props: ICardProps) {
    const {pathname} = useLocation();
    const {tour: {imageUrl, price, title, description, id}, isAuth} = props;
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
                <p>{price}</p>
            </div>
            {isAuth && <i className="fas fa-shopping-cart"/>}
        </div>

    );
}
