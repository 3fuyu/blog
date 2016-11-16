__author__ = 'vincent'
from openpyxl import Workbook
from openpyxl.reader.excel import load_workbook
import mysql.connector
import operator
import datetime


def datahtmlstr(list):
    str_list = ""
    for i in list:
        str_list = str_list + "," + str(i)
    str_list = "[" + str_list + "]"
    return str_list


def application(environ, start_response):
    list1 = ["1", "2", "3", "4", "5", "6"]

    list2 = [5, 20, 36, 10, 10, 20]
    start_response('200 OK', [('Content-Type', 'text/html')])
    body = '''<html>
<head>
<meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="http://echarts.baidu.com/dist/echarts.js"></script>
<style type="text/css">

h1 {background-color: #7FFFD4}

</style>

</head>

<body>

<h1>小站经营日报</h1>
<h2>☞流水趋势<h2/>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '站点流水'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data:''' + datahtmlstr(list1) + '''
            },
            yAxis: {},
            series: [{
                name: '金额',
                type: 'line',
                data:''' + datahtmlstr(list2) + '''
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
</body>
</html>'''
    return [body.encode('utf-8')]
