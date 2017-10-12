const fs = require('fs');
const path = require('path');

function getType(pathy){
    let type = pathy.substr(pathy.lastIndexOf('.')+1);
    switch(type){
        case 'css':
        return 'text/css';
        case 'js':
        return 'text/javascript';
        case 'jpeg':
        case 'jpg':
        return 'image/jpeg';
        case 'png':
        return 'image/png';
        case 'html':
        return 'text/html';
        case 'ico':
        return 'image/x-icon';
        default:
        return false;
    }
}

function staticHandler(req, res){
    if(getType(req.path)){
        fs.readFile(path.join(__dirname, '..', req.path), function(err, data){
            if(err){
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type':getType(req.path)
            });
            res.write(data);
            res.end();
        })
    }else{
        return true;
    }
}

module.exports = staticHandler;