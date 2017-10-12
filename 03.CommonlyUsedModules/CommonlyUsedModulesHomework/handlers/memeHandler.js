//  need to add functionality for downloading the meme!!!

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const util = require('util');

// for generation of random id
const shortid = require('shortid');

const db = require('../config/database.js');

function memeHandler(req, res){
    if(req.path == '/view/all' && req.method == 'GET'){
        viewAllMemes(req, res);
    }else if(req.path.startsWith('/getDetails') && req.method == 'GET'){
        viewDetailedMeme(req, res);
    }else if(req.path == '/addMeme' && req.method == 'GET'){
        viewAddMemeForm(req, res);
    }else if(req.path == '/addMeme' && req.method == 'POST'){
        addMeme(req, res);
    }
    else{
        return true;
    }
}

function addMeme(req, res){
    let form = new formidable.IncomingForm();
    let dir = Math.floor(db.getLength()/10);
    let nameMeme = shortid.generate();
    let pathToMemeStorage = path.join(__dirname, '..', 'public', 'memeStorage', dir+"");
    // console.log(pathToMemeStorage);
    form.on('fileBegin', function(name, file){
        if(!fs.existsSync(pathToMemeStorage)){
            fs.mkdirSync(pathToMemeStorage);
        }

        file.path = path.join(pathToMemeStorage, nameMeme + '.jpg');
        // console.log(file.path);
    });

    form.parse(req, function (err, fields, files) {
        let meme = createMeme(fields['memeTitle'], path.join('\\public', 'memeStorage', dir+"", nameMeme + '.jpg'), fields['memeDescription'], fields['status'])
    
        db.save(meme);
        viewAddMemeForm(req, res);
    
    })
}

function createMeme(title, memeSrc, description, privacy){
    return {
        id : db.getNextId(),
        title : title,
        memeSrc : memeSrc,
        description : description,
        privacy : privacy,
        dateStamp : Date.now()
    }
}

function viewAddMemeForm(req, res){
    fs.readFile(path.join(__dirname, '..', 'views', 'addMeme.html'), 'utf-8', function(err, data){
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
}

function viewAllMemes(req, res){
    let memes = db.getCopyData();
    let html = '';
    for(let meme of memes){
        if(meme.privacy == 'on'){
            html += `<div class="meme" style>
            <a href="/getDetails?id=${meme.id}">
            <img class="memePoster" src="${meme.memeSrc}"/>          
          </div>`
        }
        
    }

    fs.readFile(path.join(__dirname, '..', 'views', 'viewAll.html'), 'utf-8', function(err, data){
        if(err){
            console.log(err);
            return;
        }

        let template = data.replace(`{{replaceMe}}`, html);
        res.writeHead(200, {
            'Content-Type':"text/html"
        });

        res.write(template);
        res.end();
    })
}

function viewDetailedMeme(req, res){
    let id = req.url.split('=')[1];
    let memeInfo = db.getById(id);

    fs.readFile(path.join(__dirname, '..', 'views', 'viewAll.html'), 'utf-8', function(err, data){
        if(err){
            console.log(err);
            return;
        }
        let html = `
        <div class="content">
        <img src="${memeInfo.memeSrc}" alt=""/>
        <h3>Title ${memeInfo.title}</h3>
        <p> ${memeInfo.description}</p>
        <button><a href="${memeInfo.memeSrc}">Download Meme</a></button>
        </div>`;
        let template = data.replace('<div id="replaceMe">{{replaceMe}}</div>', html);
        
        res.writeHead(200, {
            'Content-Type':'text/html'
        });
        res.write(template);
        res.end();
    
    })

    // console.log(memeInfo);
}

module.exports = memeHandler;