import {Route, Switch} from "react-router-dom";
import "./App.scss";
import SignIn from "./components/SignIn/SignIn";
import {IRoute} from "./interfaces/IRoute";
import ToursList from "./components/ToursList/ToursList";
import {observer} from "mobx-react-lite";

import * as mobx from "mobx";
import data from "./store/Data"
import {useEffect} from "react";


const routes: IRoute[] = [
    {
        id: 1,
        exact: true,
        path: "/",
        component: <SignIn/>
    },
    {
        id: 2,
        path: "/tours",
        component: <ToursList/>
    }
];


const App = observer(() => {
    useEffect(() => {
        data.fetchTours();
    }, [])
        console.log(mobx.toJS(data.tours));

    console.log(data.getOneTour(10))

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
})

export default App;
