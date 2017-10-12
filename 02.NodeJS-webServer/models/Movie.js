let MovieMaker = (function(){
    function createMovie(name, yearReleased, linkPoster, description){
        let movie = {
            name,
            yearReleased,
            linkPoster,
            description
        };

        return movie;
    }

    return {
        createMovie
    }

})();

module.exports = MovieMaker;