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

// import path from 'path';
// import fs from 'fs';

// import React from 'react';
// import express from 'express';
// import ReactDOMServer from 'react-dom/server';

// import App from '../src/components/app';

// const app = express();
// const port = 3000;


// app.get('/', (request, response) => {
//   const app = ReactDOMServer.renderToString(<App />);
//   const indexFile = path.resolve('./build/index.html');

//   fs.readFile(indexFile, 'utf8', (error, data) => {
//     if (error) {
//       console.error('Something went wrong:', error);
//       return response.status(500).send('Oops, better luck next time!');
//     }

//     return response.send(
//       data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
//     );
//   });
// });

// app.use(express.static('public'));

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
