const fs = require('fs')
const path = require("path");
const express = require("express");

const app = express();
const port = 3000;


app.use(express.static('public'));


app.get('/:path', (request, response, next) => {
  file = path.join(__dirname, 'public', request.params.path + '.html');

  fs.readFile(file, (error, data) => {
    if (error) {
      next(error);
    } else {
      response.send(data);
    }
  });
});


app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
