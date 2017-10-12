const fs = require('fs');
const path = require('path');
const pathToDB = '../db/dataBase.json';

let db = (function(){
    let dataDB = [];

    function populateDB(){
        fs.readFile(path.join(__dirname, pathToDB),'utf-8', function(err, data){
            if(err){
                console.log(data);
                return;
            }
            
            dataDB = JSON.parse(data);
            // callback();
        })
    }

    function getCopyData(){
        // console.log(dataDB);
        return dataDB.slice(0);
    }

    function save(item){
        dataDB.push(item);
        fs.writeFile(path.join(__dirname, pathToDB), JSON.stringify(dataDB), function(err){
            if(err){
                console.log(err);
                return;
            }
        })
    }

    function getNextId(){
        if(dataDB.length!==0){
            let id = Number(dataDB[dataDB.length-1].id) + 1
            return id +"";
        }
        return "1";
    }

    function getById(id){
        // console.log(dataDB);
        return dataDB.filter(function(e){
            return e.id == id;
        })[0];
    }

    function getLength(){
        return dataDB.length;
    }


    return {
        getById, 
        getNextId,
        save,
        populateDB,
        getCopyData,
        getLength
    }
})();

db.populateDB();
module.exports = db;