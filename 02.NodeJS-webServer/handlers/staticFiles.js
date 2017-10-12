const fs = require('fs');
const path = require('path');

function validateFileExtension(path) {
    if (path.endsWith('html') ||
        path.endsWith('js') ||
        path.endsWith('css') ||
        path.endsWith('jpeg') || 
        path.endsWith('png') ||
        path.endsWith('ico')) {
            return true;
    }
    return false;
}

function getContentType(path){
    if(path.endsWith('js')){
        return 'application/javascript';
    }else if(path.endsWith('css')){
        return 'text/css';
    }else if(path.endsWith('html')){
        return 'text/html';
    }else if(path.endsWith('ico')){
        return 'image/x-icon';
    }else if(path.endsWith('jpeg')){
        return 'image/jpeg';
    }else if(path.endsWith('png')){
        return 'image/png';
    }
    return 'text/plain'
}


function handleStaticFiles(req, res) {
    console.log(path.join(__dirname, '..', req.path));
    fs.readFile(path.join(__dirname, '..', req.path), function(err, data){
        if(err 
            || req.method !== 'GET' 
            || (!req.path.startsWith('/content') && !req.path.startsWith('/requestfavicon'))
            || !validateFileExtension(req.path)){
            console.log(err);
            res.writeHead(404);
            res.write('404 Not found');
            res.end();
            return;
        }
        res.writeHead(200, {
            'Content-Type' : getContentType(req.path)
        });
        // console.log(data);
        res.write(data);
        res.end();
    })
}

module.exports = handleStaticFiles;