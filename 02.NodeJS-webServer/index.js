const http = require('http');
const url = require('url');
const port = 1235;
const handlers = require('./handlers');
console.log(handlers);


http.createServer(function(req, res){
    req.path = url.parse(req['url']).pathname;

    // console.log(req.path);

    for(let handler of handlers){
        let next = handler(req, res);
        if(!next){
            break;
        }
    }

}).listen(port);

console.log(`Server is listening on port ${port}`)