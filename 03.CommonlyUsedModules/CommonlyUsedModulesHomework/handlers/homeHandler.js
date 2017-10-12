const fs = require('fs');
const path = require('path');

function homehandler(req, res){
    if((req.path == '/' || req.path == '/home') && req.method == 'GET'){
        fs.readFile(path.join(__dirname, '..', 'views', 'home.html'), 'utf-8', function(err, data){
            if(err){
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type' : 'text/html'
            });
            res.write(data);
            res.end();

        })
    }else{
        return true;
    }

}

module.exports = homehandler;
