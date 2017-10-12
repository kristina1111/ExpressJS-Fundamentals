const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'database.json');

class Database {
    constructor() {
        this.data = [];
    }

    populateData() {
        let that = this;
        return new Promise(function (resolve, reject) {
            if (fs.existsSync(dbPath)) {
                fs.readFile(dbPath, 'utf-8', function (err, data) {
                    if (err) {
                        return;
                    }
                    // console.log('first');
                    // console.log(JSON.parse(data));
                    that.data = JSON.parse(data);
                })
            }

            resolve();
        })

    }

    getLastId(){
        if(this.data.length !== 0){
            return this.data[this.data.length-1].id;
        }
        return 0;
    }

    getAllMovies(){
        return this.data;
    }

    // need to create Movie class!!!
    saveMovie(movie){
        this.data.push(movie);
        fs.writeFileSync(dbPath, JSON.stringify(this.data));
    }

    showMovie(id) {
        let movie = this.data.filter(function (e) {
            return e.id === Number(id);
        })[0];
        // console.log(movie);
        if (!movie) {
            return false;
        }
        return movie;
    }
}

let db = new Database();
db.populateData();
//     .then(function () {
//         // console.log('second');
//         // console.log(db.data);
//         console.log(db.showMovie(3));
//     });



module.exports = db;
