import {Route, Switch} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import {IRoute} from "./interfaces/IRoute";
import ToursList from "./components/ToursList/ToursList";
import Tour from "./components/Tour/Tour";
import "./App.scss";
import Cart from "./components/Cart/Cart";

const routes: IRoute[] = [
    {
        id: 1,
        exact: true,
        path: "/",
        component: <SignIn/>
    },
    {
        id: 2,
        exact: true,
        path: "/tours",
        component: <ToursList/>
    },
    {
        id: 3,
        path: "/tours/:id",
        component: <Tour/>
    },
    {
        id: 4,
        path: "/cart",
        component: <Cart/>
    }
];


const App = () => {

    return (
        <div>
            <Switch>
                {routes.map(el => (
                    <Route key={el.id} exact={el.exact || false} path={el.path}>
                        {el.component}
                    </Route>
                ))}
            </Switch>
        </div>
    );
}

export default App;
