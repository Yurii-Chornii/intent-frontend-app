import {Route, Switch} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import {IRoute} from "./interfaces/IRoute";
import ToursList from "./components/ToursList/ToursList";
import "./App.scss";
import Tour from "./components/Tour/Tour";

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
    }
];


const App = () => {

    return (
        <div>
           {/*router*/}
            <Switch>
                {routes.map(el => (
                    <Route key={el.id} exact={el.exact || false} path={el.path}>
                        {el.component}
                    </Route>
                ))}
            </Switch>
            {/*router*/}

        </div>
    );
}

export default App;
