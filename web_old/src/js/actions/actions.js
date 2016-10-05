/**
 * Created by 3fuyu on 16/9/14.
 */
"use strict";

/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';


/*
 * action 创建函数
 */

export function addTodo(text) {
    return { type: ADD_TODO, text };
}

export function completeTodo(index) {
    return { type: COMPLETE_TODO, index };
}