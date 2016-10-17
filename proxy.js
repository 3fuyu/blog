var proxy = require('http-proxy').createProxyServer({});

proxy.on(function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
});

var server = require('http').createServer(function (req, res) {
    var host = req.headers.host;
    switch (host) {
        case 'www.3fuyu.com':
            proxy.web(req, res, {target: 'http://3fuyu.com:8081'});
            break;
        case '3fuyu.com':
            proxy.web(req, res, {target: 'http://3fuyu.com:8081'});
            break;
        default:
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Welcome to my server!');
    }
});

console.log("listening on port 80")

// 监听服务器上 80 端口
server.listen(80);