/**
 * Created by 3fuyu on 16/03/10.
 */
"use strict";

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import blog from './reducers/reducers';

// var React = require('react');
// var ReactDOM = require('react-dom');
var DataService = require('./service/DataService.js');
var CacheService = require('./service/CacheService.js');
var ReactRouter = require('react-router');
var StorageService = require('./service/StorageService.js');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;
var hashHistory = ReactRouter.hashHistory;

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './components/management/login.jsx';
import Main from './components/management/main.jsx';

injectTapEventPlugin();

let store = createStore(blog);

const App = () => (

    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Router path="/" components={Login}></Router>
            <Router path="/management/login" components={Login}></Router>
            <Router path="/management/main" components={Main}></Router>
        </Router>
    </MuiThemeProvider>
);

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);