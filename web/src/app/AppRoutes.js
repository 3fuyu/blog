import React from "react";
import {Route, Redirect, IndexRoute} from "react-router";
import Master from '../app/js/components/management/Master';
import Login from "../app/js/components/management/login";
import Home from "../app/js/components/index/home";
import NewArticle from "../app/js/components/management/newArticle";
import ArticleList from "../app/js/components/management/ArticleList";


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
    <Route path="/" component={Master}>
        <IndexRoute component={Home}/>
        <Redirect from="management" to="/management/article-list" />
        <Route path="management">
            <Route path="login" component={Login}/>
            <Route path="new-article" component={NewArticle}/>
            <Route path="article-list" component={ArticleList}/>
        </Route>
    </Route>
);

export default AppRoutes;
