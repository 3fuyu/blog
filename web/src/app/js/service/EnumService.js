/**
 * Created by 3fuyu on 16/03/17.
 */

var ENUM = {};

ENUM.TaskStatus = {
    0: '无',
    1: '待执行',
    2: '整改中',
    3: '整改完成待核查',
    4: '整改关闭待核查',
    5: '关闭'
};

ENUM.TaskResult = {
    0: '无',
    1: '核查完成',
    2: '核查关闭',
    3: '整改完成',
    4: '整改关闭',
    5: '核查延误',
    6: '复查延误',
    7: '整改延误'
};

ENUM.TaskProcessResult = {
    0: '无',
    1: '整改中',
    2: '整改关闭',
    3: '整改合格',
    4: '整改延误'
};

module.exports = ENUM;