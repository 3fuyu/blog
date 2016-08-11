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

attachFastClick.attach(document.body);  // fastclick

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

ReactDOM.render(
    <Router history={hashHistory}>
        <Router path="/" components={Main}></Router>
    </Router>,
    document.getElementById('app')
);