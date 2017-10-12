const fs = require('fs');
const db = require('../config/database.js');
const path = require('path');
const querystring = require('querystring');
const MovieMaker = require('../models/Movie.js');

// console.log(path.join(__dirname, '..', 'views', 'addMovie.html'));
// die();
function movieAdd(req, res) {
    if (req.path === '/movie/add' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, '..', 'views', 'addMovie.html'), 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        })
    } else if (req.path === '/addMovie' && req.method === 'POST') {
        // console.log('here');
        let result = '';
        req.on('data', function (data) {
            result += data;
        })
        req.on('end', function () {
            let movieData = querystring.parse(result);
            let movie = MovieMaker.createMovie(movieData.movieTitle, movieData.movieYear, movieData.moviePoster, movieData.movieDescription);
            movie.id = 1 + db.getLastId();
            db.saveMovie(movie);
            res.writeHead(302, {
                'Location': '/movies/all'
            });
            res.end();
        })



    }
    else {
        return true;
    }
}

module.exports = movieAdd;