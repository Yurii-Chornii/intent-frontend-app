import {Link, useParams} from "react-router-dom";
import data from "../../store/Data"
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import "./Tour.scss"


interface IParams {
    id: string
}

const Tour = observer(() => {
    const params = useParams<IParams>();
    useEffect(() => {
        data.findAndSetCurrentTour(+params.id);

        return () => {
            data.setCurrentTour(undefined);
        }
    }, [params]);

    return (
        <div>
            <Link to="/tours">
                <button className="tour-page-button">back to list</button>
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
                                {true && <button className="tour-page-button">add to cart</button>}
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
