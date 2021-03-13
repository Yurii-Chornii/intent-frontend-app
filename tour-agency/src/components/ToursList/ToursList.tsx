// import * as mobx from "mobx";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import data from "../../store/Data"
import "./ToursList.scss"
import Card from "../Card/Card";


const ToursList = observer(() => {
    const [showSortParams, setShowSortParams] = useState(false);

    useEffect(() => {
        if (data.tours.length === 0) {
            data.fetchTours();
        }
    }, [])

    const showParamsHandler = (e: any): void => {
        if (!showSortParams) {
            setShowSortParams(true);
            e.target.classList.add("opened-params");
        } else {
            setShowSortParams(false);
            e.target.classList.remove("opened-params");
        }
    }

    const paramsFormHandler = (e: any): void => {
        e.preventDefault();
        const from = +e.target[0].value;
        const till = +e.target[1].value;
        if (from !== till && from < till) {
            data.filterByPrice(from, till)
            data.setMinPriceFilterMemory(from);
            data.setMaxPriceFilterMemory(till);
        } else {
            alert("Filter params is not valid!")
        }
    }

    const deleteFilter = (): void => {
        data.deleteFilterMemory();
        data.fetchTours();
    }


    const params = <div className="params">
        Count tours on the page:
        <select defaultValue={data.countCardsOnPage} name="countToursOnPage" id="countToursOnPage"
                onChange={(e) => data.changeCountCardsOnPage(+e.target.value)}>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
        </select>
        <i className="fas fa-funnel-dollar"/>
        {
            data.minPriceFilterMemory || data.maxPriceFilterMemory ? (
                <>
                    <div>{`Filtered by price from ${data.minPriceFilterMemory} till ${data.maxPriceFilterMemory}`}</div>
                    <i className="far fa-window-close" onClick={deleteFilter}/>
                </>

            ) : (
                <form onSubmit={paramsFormHandler}>
                    <input type="number" placeholder="price from" min="0" step="50"/>
                    <input type="number" placeholder="price till" min="150" step="50"/>
                    <button>submit</button>
                </form>
            )
        }

    </div>


    return (
        <div>
            <div className="cads-box">
                <div className="sort-and-filter-box">
                    <div className="sort-and-filter-box__menu">
                        <i className="fas fa-chevron-left arrow" onClick={(e) => showParamsHandler(e)}/>
                        {showSortParams && params}
                    </div>
                </div>
                {data.tours.length === 0 ? (<h3>Tours is not found</h3>) : (
                    <>
                        {data.currentTours && data.currentTours.map(value => (
                            <Card key={value.id} tour={value}/>
                        ))}
                    </>
                )}

            </div>
        </div>
    );
})

export default ToursList;
