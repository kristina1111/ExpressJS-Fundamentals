const db = require('../config/database.js');
const fs = require('fs');
const path = require('path');

function movieGetHandler(req, res){
    if(req.path === '/movies/all'){
        fs.readFile(path.join(__dirname, '..', 'views', 'viewAll.html'), 'utf-8', function(err, data){
            if(err){
                console.log(err);
                return;
            }

            let html = '';
            let movies = db.getAllMovies();
            for(let movie of movies){
                html += `
                <div class="ad-container col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                <div class="ad-body">
                <div class="ad-info">
                <div class="ad-image link-product-page" data-id="${movie.id}"><a href="${movie.linkPoster}" ><img src="${movie.linkPoster}" alt="">
                </a></div>
                <div><span>Movie name: </span><a href="/movie/details/${movie.id}"
                                                   class="link-product-page">${movie.name}</a></div>
                <div><span>Year released: </span><span>${movie.yearReleased}</span></div>
                <div><a href="/movie/details/${movie.id}"
                class="link-product-page">View more</a></div>
            </div>
            </div>
            </div>
                `;
            }

            data = data.replace('{{replaceMe}}', html);
            res.writeHead(200, {
                'Content-Type' : 'text/html'
            });
            res.write(data);
            res.end();
        })
    }else if(req.path.startsWith('/movie/details/')){
        let movieId = req.path.substr(req.path.lastIndexOf('/')+1);
        let movie = db.showMovie(movieId);
        // console.log(movie);
        if(!movie){
            console.log(err);
            res.writeHead(404);
            res.write('404 Not found');
            res.end();
            return;
        }

        fs.readFile(path.join(__dirname, '..', 'views', 'details.html'), 'utf-8', function(err, data){
            if(err){
                console.log(err);
                return;
            }

            let html = `<div id="viewAllAd">
            <div class="all-info-container">
                <div class="ad-body">
                    <div class="ad-header">
                    </div>
                    <div class="ad-info row">
                        <div class="ad-image-big col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"><a href="${movie.linkPoster}" ><img src="${movie.linkPoster}"
                                                                                                   alt=""></a></div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div><span>Movie name: </span>${movie.name}</span>
                            </div>
                            <div><span>Description: </span><span>${movie.description}</span></div>
                            <div><span>Year released: </span><span>${movie.yearReleased}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        
        data = data.replace('{{replaceMe}}', html);
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        res.write(data);
        res.end();

        })
        
    }
    else{
        return true;
    }
}

module.exports = movieGetHandler;