import "./Card.scss"
import {ITour} from "../../interfaces/ITour";

interface ICardProps {
    tour: ITour
}

export default function Card(props: ICardProps) {
    const {tour: {imageUrl, price, title, description}} = props;
    return (
        <div className="card noselect">
            <div>
                <img className="card__img" src={imageUrl} alt={title}/>
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
        </div>
    );
}
