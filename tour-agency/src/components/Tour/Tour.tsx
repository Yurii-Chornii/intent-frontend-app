import {Link, useHistory, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import "./Tour.scss"
import Users from "../../store/Users";

interface IParams {
    id: string
}

interface ItourDB {
    id: number,
    title: string,
    description: string,
    price: number,
    imageUrl: string
}

const initTour: ItourDB = {
    id: 0,
    title: "",
    description: "null",
    price: 0,
    imageUrl: ""
}

const Tour = observer(() => {
    const [tour, setTour] = useState(initTour);
    const params = useParams<IParams>();
    const history = useHistory();


    useEffect(() => {
        if (!Users.loginedUserDB) history.push("/");
    }, [history])

    const findTour = async (tourId: number) => {
        await fetch('http://localhost:8765/api/tours/id/' + tourId)
            .then(value => value.json())
            .then(value => {
                if (value.message) {
                    history.push("/tours")
                } else {
                    setTour(value)
                }
            })
            .catch(e => console.error(e))
    }

    useEffect(() => {
        findTour(+params.id)
    }, [params.id])

    return (
        <div>
            <Link to="/tours">
                <button className="btn btn-success m-3">back to list</button>
            </Link>
            {
                tour.title !== "" && tour.id !== 0 ? (
                    <div className="tour">
                        <header className="tour__header">
                            <img src={tour.imageUrl} alt={tour.title}/>
                        </header>
                        <section>
                            <article>
                                <h3 className="tour__title">{tour.title}</h3>
                                <p className="tour__description">
                                    {tour.description}
                                </p>
                            </article>
                        </section>
                        <footer className="tour__footer">
                            <div>
                                {
                                    !Users.isItemInCart(tour.id) ?
                                        <button className="btn btn-success mb-3"
                                                onClick={() => Users.addToCart(tour.id, tour.price)}>Add to
                                            cart</button>
                                        :
                                        <button className="btn btn-dark mb-3"
                                                onClick={() => Users.removeFromCart(tour.id)}>Remove from cart</button>
                                }
                            </div>
                            <b>{tour.price}$</b>
                        </footer>
                    </div>) : (<div>
                    <h2 style={{textAlign: "center"}}>Loading...</h2>
                </div>)
            }
        </div>
    );
});
export default Tour;
