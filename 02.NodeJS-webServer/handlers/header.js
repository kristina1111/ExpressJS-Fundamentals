let fs = require('fs');
let path = require('path');
let db = require('../config/database')

module.exports = (req, res) => {
    if(req.headers.statusheader === "Full") {
        fs.readFile(path.join(__dirname, '..', 'views', 'status.html'), 'utf-8', (err, data) => {
            if(err) {
                console.log(err);
                res.writeHead(404);
                res.write('404 Not Found');
                res.end();
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let movieCount = db.getAllMovies.length;
            data = data.replace('{{replaceMe}}', `There are currently ${movieCount} movies.`)
            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
}