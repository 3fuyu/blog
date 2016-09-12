/**
 * Created by 3fuyu on 16/03/10.
 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var DataService = require('./service/DataService.js');
var CacheService = require('./service/CacheService.js');
var ReactRouter = require('react-router');
var StorageService = require('./service/StorageService.js');
var attachFastClick = require('fastclick');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;
var hashHistory = ReactRouter.hashHistory;

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './components/login.jsx';

// let Login = require('./components/login.jsx');

attachFastClick.attach(document.body);  // fastclick

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var Main = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    onSubmit: function () {
        console.log('submit');
        DataService.queryArticalList().then(function (data) {
            console.log(data);
        });
    },
    render: function () {
        return (
            <div>
                <div>this is main page</div>
                <button type="button" onClick={this.onSubmit}>登陆</button>
            </div>
        )
    }
});

const App = () => (
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Router path="/" components={Main}></Router>
            <Router path="/login" components={Login}></Router>
        </Router>
    </MuiThemeProvider>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);