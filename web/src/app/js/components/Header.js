"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var hashHistory = ReactRouter.hashHistory;

var config = React.createClass({
    leftAction: function () {
        if (this.headerConfig.left) {
            this.headerConfig.left && this.headerConfig.left();
        } else {
            hashHistory.goBack();
        }
    },
    rightAction: function () {
        this.headerConfig.right.action();
    },
    render: function () {
        this.headerConfig = {
            left: '',
            title: '默认标题',
            right: {
                title: '',
                action: function () {}
            }
        };

        if (this.props.headerConfig.left) {
            this.headerConfig.left = this.props.headerConfig.left;
        }

        if (this.props.headerConfig.title) {
            this.headerConfig.title = this.props.headerConfig.title;
        }

        if (this.props.headerConfig.right) {
            this.headerConfig.right = this.props.headerConfig.right;
        }

        return (
            <header className="zl-header zl-box zl-box-horizontal zl-box-vertical-center zl-bg005">
                <a href="javascript:void(0)" className="zl-header-btn needsclick" onClick={this.leftAction}><i
                    className="icon-back"></i></a>
                <h1 className="zl-flex zl-header-title">{this.headerConfig.title}</h1>
                <a href="javascript:void(0)" className="zl-header-btn" onClick={this.rightAction}>{this.headerConfig.right.title}</a>
            </header>
        );
    }
});

module.exports = config;