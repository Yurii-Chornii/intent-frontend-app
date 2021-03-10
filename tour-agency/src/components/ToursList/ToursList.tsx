// import * as mobx from "mobx";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import data from "../../store/Data"
import "./ToursList.scss"
import Card from "../Card/Card";

const ToursList = observer(() => {
    useEffect(() => {
        data.fetchTours();
    }, [])
    // console.log(mobx.toJS(data.tours));
    // console.log(data.countOfPages)

    if (data.tours.length === 0){
        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <div>
            <div className="cads-box">
                {data.currentTours && data.currentTours.map(value => (
                    <Card key={value.id} tour={value}/>
                ))}
            </div>
        </div>
    );
})

export default ToursList;
