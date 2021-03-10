// import * as mobx from "mobx";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import data from "../../store/Data"
import "./ToursList.scss"

const ToursList = observer(() => {
    useEffect(() => {
        data.fetchTours();
    }, [])
    // console.log(mobx.toJS(data.tours));

    if (data.tours.length === 0){
        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <div>
            bla bla
            <div>{data.currentTours && data.currentTours.map(value => (
                <div key={value.id}>{value.id} - {value.title} - {value.price}</div>
            ))}</div>
            <button onClick={() => data.incrementPage()}>inc</button>
            <button onClick={() => data.decrementPage()}>dec</button>
            <button onClick={() => data.sort("asc")}>asc</button>
            <button onClick={() => data.sort("desc")}>desc</button>
        </div>
    );
})

export default ToursList;
