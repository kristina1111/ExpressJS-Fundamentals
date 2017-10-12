const http = require('http')
const url = require('url')
const handlers = require('./handlers/handlerBlender')
const db = require('./config/dataBase')
const port = process.env.PORT || 1235

// id populaation is here, db is populated only here! not in memeHandler ???? why ??? different instances ???
// db.populateDB(function(){
  http
  .createServer((req, res) => {
      for (let handler of handlers) {
        req.path = url.parse(req.url).pathname
        let task = handler(req, res)

        if (task !== true) {
          break 
        }

      }
    })
    .listen(port)
  
    console.log('Server is listening on port ' + port)
// })
