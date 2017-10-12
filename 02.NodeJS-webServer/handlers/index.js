const homeHandler = require('./home.js');
const movieAddHandler = require('./movieAdd.js');
const movieGetHandler = require('./movieGet.js');
const staticFileHandler = require('./staticFiles.js');
const statusHeader = require('./header.js');

module.exports = [homeHandler, movieAddHandler, movieGetHandler, staticFileHandler, statusHeader];