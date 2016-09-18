/**
 * Created by 3fuyu on 16/9/14.
 */
"use strict";

import { combineReducers } from 'redux';
import todos from './todos';

const blog = combineReducers({
    todos
});

export default blog;