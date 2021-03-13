import {Link, useParams} from "react-router-dom";
import data from "../../store/Data"
import {observer} from "mobx-react-lite";
import {useEffect} from "react";


interface IParams {
    id: string
}

const Tour = observer(() => {
    const params = useParams<IParams>();
    useEffect(() => {
        data.findAndSetCurrentTour(+params.id);
    }, [params])


    return (
        <div>
            <Link to="/tours">
                <button>back to tours list</button>
            </Link>
            {data.currentTour ? data.currentTour.title : "tour in not found"}
        </div>
    );
})
export default Tour;
