#!/usr/local/bin/node

// dependencies
const http = require('http');

// config
const port=21212;

// main
http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = JSON.parse(Buffer.concat(body).toString());
    body.headers = request.headers;
    console.log(Date());
    console.log(JSON.stringify(body, undefined, 2));
    response.on('error', (err) => {
      console.error(err);
    });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(body));
    response.end();
  });
}).listen(port);
