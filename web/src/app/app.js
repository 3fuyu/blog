import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Router, useRouterHistory} from 'react-router';
import AppRoutes from './AppRoutes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
// Helpers for debugging
window.React = React;
window.Perf = require('react-addons-perf');
window.$ = $;
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/**
 * Render the main app component. You can read more about the react-router here:
 * https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
 */

const App = () => (
    <MuiThemeProvider>
        <Router history={useRouterHistory(createHashHistory)({queryKey: false})}
                onUpdate={() => window.scrollTo(0, 0)}>
            {AppRoutes}
        </Router>
    </MuiThemeProvider>
);

render(
    <App />
    , document.getElementById('app'));
