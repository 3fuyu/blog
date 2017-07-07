import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import Master from '../app/js/components/management/Master';
import Login from '../app/js/components/management/Login';
import Home from '../app/js/components/index/Home';
import ArticleDetail from '../app/js/components/index/ArticleDetail';
import NewArticle from '../app/js/components/management/NewArticle';
import ArticleList from '../app/js/components/management/ArticleList';
import ArticleCategory from '../app/js/components/management/ArticleCategory';
import Media from '../app/js/components/management/Media';
import About from '../app/js/components/index/About';


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

        <Route path="login" component={Login}/>

        <Route path="management">
            <Route path="new-article/:type" component={NewArticle}/>
            <Route path="article-list" component={ArticleList}/>
            <Route path="article-category" component={ArticleCategory}/>
            <Route path="media" component={Media}></Route>
        </Route>
        <Route path="about" component={About}></Route>

        <Route path="article/:year/:month/:day/:id" component={ArticleDetail}></Route>
    </Route>
);

export default AppRoutes;
