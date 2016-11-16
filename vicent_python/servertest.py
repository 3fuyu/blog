__author__ = 'vincent'
from wsgiref.simple_server import make_server

from htmltest import application

port = 54230
httpd = make_server('', port, application)
print("你可以访问  http://localhost:" + str(port) + "/")

httpd.serve_forever()
