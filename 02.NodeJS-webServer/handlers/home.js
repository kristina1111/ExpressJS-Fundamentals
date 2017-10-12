const fs = require('fs');
const path = require('path');

function homeHandler(req, res){
    // console.log('YES');
    if(req.path === '/'){
        console.log(path.join(__dirname, '..', 'views', 'home.html'));
        fs.readFile(path.join(__dirname, '..', 'views', 'home.html'), 'utf-8', function(err, data){
            if(err){
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        })
    }else{
        return true;
    }
}

module.exports = homeHandler;