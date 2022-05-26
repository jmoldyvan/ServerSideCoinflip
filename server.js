const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')


const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  const reWrite = (file,contentType) => {
    fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }
  switch (page) {
    case '/':
      reWrite('index.html','text/html')
      break;
    case '/otherpage':
      reWrite('otherpage.html','text/html')
      break;
    case '/otherotherpage':
      reWrite('otherotherpage.html','text/html')
      break;
    case '/api':
        let flipResult = (params['student']== 'flip') ? Math.random() <= .5 ? "heads" : "tails" : "type 'flip' in the input box"
        flipResult  = Math.random() <= .5 ? "heads" : "tails"
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: flipResult
        }
        res.end(JSON.stringify(objToJson));
      break;
  
  case '/css/style.css':
    fs.readFile('css/style.css', function(err, data) {
      console.log(err);
      res.write(data);
      res.end();
    });
    break;
    case '/js/main.js':
      reWrite('js/main.js','text/javascript')
      break;
  }
});
  server.listen(8000);