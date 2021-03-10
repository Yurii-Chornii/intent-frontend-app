import * as mobx from "mobx";
import {observer} from "mobx-react-lite";

import data from "../../store/Data"
import {useEffect} from "react";
import "./ToursList.scss"

const ToursList = observer(() => {
    useEffect(() => {
        data.fetchTours();
    }, [])
    console.log(mobx.toJS(data.tours));

    
    if (data.tours.length === 0){
        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <div>
            asdas
        </div>
    );
})

export default ToursList;
