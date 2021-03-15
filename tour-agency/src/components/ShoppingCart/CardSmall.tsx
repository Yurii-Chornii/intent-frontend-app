import {Link, useLocation} from "react-router-dom";
import {ITour} from "../../interfaces/ITour";
import usersStore from "../../store/usersStore"
import "./CardSmall.scss"


interface ICardProps {
    tour: ITour,
    isAuth: boolean
    delTourFromCart(id:number): any
    
}

export default function CardSmall(props: ICardProps) {
    const {pathname} = useLocation();
    const {tour: {imageUrl, price, title, description, id}, isAuth, delTourFromCart} = props;
    return (
        <div className="cardsmall noselect">
            <div className="cardsmall__imgframe">
                <Link to={`${pathname}/${id}`}>
                    <img className="cardsmall__img" src={imageUrl} alt={title}/>
                </Link>
            </div>
            <div className="cardsmall__body">
                <h4 className="cardsmall__title">{title}</h4>
                {/* <p>{
                    description.slice(0, description.indexOf(".") < 100 ? description.indexOf(".") + 1 : 100) + "..."
                }</p> */}
            </div>            
            <div className="cardsmall__price">
                <p>{price}</p>
            </div>
            {isAuth && 
            <div className="cardsmall__end">        
                
                {/* <button onClick={() => usersStore.delTourFromCart(id)}> Delete from cart </button>  */}
                <div className="cardsmall__close" onClick={() => usersStore.delTourFromCart(id)} >X</div>   
            </div>}
        </div>

    );
}
