// import * as mobx from "mobx";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import data from "../../store/Data"
import "./ToursList.scss"
import Card from "../Card/Card";

const ToursList = observer(() => {
    const [showSortParams, setShowSortParams] = useState(false);
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

    const showParamsHendler = (e: any): void => {
        if (!showSortParams){
            setShowSortParams(true);
            e.target.classList.add("opened-params");
        }else{
            setShowSortParams(false);
            e.target.classList.remove("opened-params");
        }
    }

    const params = <div className="params">
        Count tours on the page:
        <select defaultValue={data.countCardsOnPage} name="countToursOnPage" id="countToursOnPage" onChange={(e) => data.changeCountCardsOnPage(+e.target.value)}>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
        </select>
        <form onSubmit={(e: any) => {
            e.preventDefault();
            console.log(e.target[0]);
            // data.filterByPrice()
        }}>
            <i className="fas fa-funnel-dollar"/>
            <input type="number" placeholder="price from"/>
            <input type="number" placeholder="price till"/>
            <button>submit</button>
        </form>
    </div>




    return (
        <div>
            <div className="cads-box">
                <div className="sort-and-filter-box">
                    <div className="sort-and-filter-box__menu">
                        <i className="fas fa-chevron-left arrow" onClick={(e) => showParamsHendler(e)}/>
                        {showSortParams && params}
                    </div>
                </div>
                {data.currentTours && data.currentTours.map(value => (
                    <Card key={value.id} tour={value}/>
                ))}
            </div>
        </div>
    );
})

export default ToursList;
