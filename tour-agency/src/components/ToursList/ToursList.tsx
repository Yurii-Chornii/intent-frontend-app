import * as mobx from "mobx";
import {observer} from "mobx-react-lite";

import data from "../../store/Data"
import {useEffect} from "react";
import "./ToursList.scss"

const ToursList = observer(() =>{
    useEffect(() => {
        data.fetchTours();
    }, [])
    console.log(mobx.toJS(data.tours));

    return (
        <div>

            Tours List page
        </div>
    );
})

export default ToursList;
