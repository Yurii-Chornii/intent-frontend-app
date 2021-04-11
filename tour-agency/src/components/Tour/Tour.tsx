import {Link, useParams} from "react-router-dom";
import data from "../../store/Data"
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import "./Tour.scss"
import Users from "../../store/Users";


interface IParams {
    id: string
}

const Tour = observer(() => {
    const [isInCart, setIsInCart] = useState(false);
    const params = useParams<IParams>();

    useEffect(() => {
        data.findAndSetCurrentTour(+params.id);

        return () => {
            data.setCurrentTour(undefined);
        }
    }, [params]);

    useEffect(() => {
        if (Users.loginedUser?.cart.findIndex(value => value === +params.id) !== -1) {
            setIsInCart(true)
        }
    }, [params.id])

    return (
        <div>
            <Link to="/tours">
                <button className="btn btn-success">back to list</button>
            </Link>
            {
                data.currentTour ? (
                    <div className="tour">
                        <header className="tour__header">
                            <img src={data.currentTour.imageUrl} alt={data.currentTour.title}/>
                        </header>
                        <section>
                            <article>
                                <h3 className="tour__title">{data.currentTour.title}</h3>
                                <p className="tour__description">
                                    {data.currentTour.description}
                                </p>
                            </article>
                        </section>
                        <footer className="tour__footer">
                            <div>
                                {!isInCart ? <button className="btn btn-success" onClick={() => {
                                    Users.addNewItemToUserCart(+params.id);
                                    setIsInCart(true);
                                }}>add to cart</button>
                                :
                                    <button className="btn btn-success" onClick={() => {
                                        Users.deleteItemFromCart(+params.id);
                                        setIsInCart(false);
                                    }}>remove from cart</button>
                                }
                            </div>
                            <b>{data.currentTour.price}</b>
                        </footer>
                    </div>) : (<div>
                    <h2>"tour is not found"</h2>
                </div>)
            }
        </div>
    );
});
export default Tour;
