import {Route, Switch, Link, Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import data from "../../store/Data"
import usersStore from "../../store/usersStore"
import Card from "../ShoppingCart/CardSmall";
import {ITour} from "../../interfaces/ITour";
import "./ShoppingCart.scss"

const ShoppingCart = observer(() => {
    const [tours, setTours] = useState<ITour[]>([]);

    if (!usersStore.isAuth) {return <Redirect to="/tours" />}
    let total:number = 0

    const toursIndexes:number[] = []
      for(let i=0; i<usersStore.users[usersStore.userIndex].cart.length; i++ ) {
        toursIndexes[i] = usersStore.users[usersStore.userIndex].cart[i]
        console.log(toursIndexes[i])
        total += parseInt(data.tours[toursIndexes[i]].price.slice(0, -1))

      }
    
    let list:string = ""    
    list += toursIndexes.map(item => ` ${item} ` )

    console.log("list", list)

    // const tours:ITour[] = []
    useEffect(()=> {
        data.getTours().then(value => {
            if(toursIndexes.length > 0){
                const result: ITour[] = [];
                for(let item of toursIndexes){
                    const findedTour = value.find(value => value.id === item);
                    if(findedTour){
                        result.push(findedTour);
                    }
                }
                setTours(result);
            }else if(toursIndexes.length = 0){
                setTours([]);
            }
        }).catch(e => console.log(e))
    }, [toursIndexes])
    
    // toursIndexes.forEach((item)=> tours.push(data.tours[item]))
    

  

   return(

    <div className="cart-page"> 
        <div className="back">
           <Link to="/tours"><span> [ back ] </span></Link> 
           <h3>Your shopping cart</h3>
        </div>      
        <div className="cart-list">

            {tours && tours.map(value => (
                            <Card key={value.id} tour={value} isAuth={usersStore.isAuth} delTourFromCart={usersStore.delTourFromCart}/>
                        ))}
        </div> 
        <div className="total">
            <h2>T o t a l  - {total} $</h2>
        </div>  
         
        

    </div>

   )

})


export default ShoppingCart;


// const ToursList = observer(() => {
//     const [showSortParams, setShowSortParams] = useState(false);
//     const {currentPage, countOfPages} = data;


//     useEffect(() => {
//         if (data.tours.length === 0) {
//             data.fetchTours();
//         }
//     }, [])

//     const showParamsHandler = (e: any): void => {
//         if (!showSortParams) {
//             setShowSortParams(true);
//             e.target.classList.add("opened-params");
//         } else {
//             setShowSortParams(false);
//             e.target.classList.remove("opened-params");
//         }
//     }

//     const paramsFormHandler = (e: any): void => {
//         e.preventDefault();
//         const from = +e.target[0].value;
//         const till = +e.target[1].value;
//         if (from !== till && from < till) {
//             data.filterByPrice(from, till);
//             data.setMinPriceFilterMemory(from);
//             data.setMaxPriceFilterMemory(till);
//             data.setCurrentPage(1);
//         } else {
//             alert("Filter params is not valid!")
//         }
//     }

//     const deleteFilter = (): void => {
//         data.deleteFilterMemory();
//         data.fetchTours().then(() => {
//             if (data.sortedStatus) {
//                 data.sort(data.sortedStatus);
//             }
//         })
//     }

//     const sortHandler = (direction: string): void => {
//         if (data.sortedStatus === undefined || data.sortedStatus !== direction) {
//             data.setSortedStatus(direction);
//             data.sort(direction);
//         } else {
//             data.setSortedStatus(undefined);
//             if (!data.maxPriceFilterMemory) {
//                 data.fetchTours();
//             } else {
//                 const min = data.minPriceFilterMemory ? data.minPriceFilterMemory : 0;
//                 const max = data.maxPriceFilterMemory;
//                 data.filterByPrice(min, max);
//             }
//         }
//     }

//     const params = <div className="params">
//         Count tours on the page:
//         <select defaultValue={data.countCardsOnPage} name="countToursOnPage" id="countToursOnPage"
//                 onChange={(e) => {
//                     data.changeCountCardsOnPage(+e.target.value);
//                     data.setCurrentPage(1);
//                 }}>
//             <option value="3">3</option>
//             <option value="6">6</option>
//             <option value="9">9</option>
//             <option value="12">12</option>
//         </select>
//         <i className="fas fa-funnel-dollar"/>
//         {
//             data.minPriceFilterMemory || data.maxPriceFilterMemory ?
//                 (
//                     <>
//                         <div>{`Filtered by price from ${data.minPriceFilterMemory} till ${data.maxPriceFilterMemory}`}</div>
//                         <i className="far fa-window-close" onClick={deleteFilter}/>
//                     </>
//                 ) : (
//                     <form onSubmit={paramsFormHandler}>
//                         {/* <input type="number" placeholder="price from" min="0" step="50"/>
//                         <input type="number" placeholder="price till" min="150" step="50"/> */}
//                         <input type="range" placeholder="price from" min="0" max="1500" step="50" name="minrange"/>
//                         <input type="range" placeholder="price till" min="150" max={1500} step="50"/>

//                         <button>submit</button>
//                     </form>

//                 )
//         }
//         <i className="fas fa-sort-numeric-down" style={{"color": data.sortedStatus === "asc" ? "green" : ""}}
//            onClick={() => sortHandler("asc")}/>
//         <i className="fas fa-sort-numeric-down-alt" style={{"color": data.sortedStatus === "desc" ? "green" : ""}}
//            onClick={() => sortHandler("desc")}/>
//     </div>

//     const pagination = <div className="pagination">
//         {currentPage > 2 && <i className="fas fa-step-backward" onClick={() => data.setCurrentPage(1)}/>}
//         {currentPage > 1 && <i className="fas fa-caret-left" onClick={() => data.decrementPage()}/>}
//         {`${currentPage} of ${countOfPages}`}
//         {currentPage < countOfPages && <i className="fas fa-caret-right" onClick={() => data.incrementPage()}/>}
//         {currentPage < (countOfPages - 1) && <i className="fas fa-step-forward" onClick={() => data.setCurrentPage(countOfPages)}/>}
//     </div>

//     return (
//         <div>
//             <div className="cads-box">
//                 <div className="sort-and-filter-box">
//                     <div className="sort-and-filter-box__menu">
//                         <i className="fas fa-chevron-left arrow" onClick={(e) => showParamsHandler(e)}/>
//                         {showSortParams && params}
//                     </div>
//                 </div>
//                 {data.tours.length === 0 ? (<h3>Tours is not found</h3>) : (
//                     <>
//                         {data.currentTours && data.currentTours.map(value => (
//                             <Card key={value.id} tour={value} isAuth={usersStore.isAuth} addToCart={usersStore.addTourToCart}/>
//                         ))}
//                     </>
//                 )}
//             </div>
//             {
//                 countOfPages > 1 && pagination
//             }
//         </div>
//     );
// })

