import "./cart.scss";
import {ITour} from "../../interfaces/ITour";
//import Tour from "../Tour/Tour";


interface ICartProps {
    tours: ITour[]   
    
}

const cart = (props:ICartProps) => {

    const tours = props
    //console.log(props)
    //const tours = props;
    console.log("TOURS@ - ", tours)
    //tours.map(item=>console.log(item))

return (
    <div className="cartlist">
        {/* {tours.map(item => (<>{item.id}</>) )}  */}
    </div>

)


}

export default cart