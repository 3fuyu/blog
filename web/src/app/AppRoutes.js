import React from "react";
import {Route, IndexRoute} from "react-router";
import Login from "../app/js/components/management/login";
import Home from "../app/js/components/management/main";


// Here we define all our material-ui ReactComponents.

/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
    <Route path="/">
        <IndexRoute component={Login}/>
        <Route path="management">
            <Route path="main" component={Home}/>
            <Route path="login" component={Login}/>
        </Route>
    </Route>
);

export default AppRoutes;
