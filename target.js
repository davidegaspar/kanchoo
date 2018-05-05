#!/usr/local/bin/node

// dependencies
const http = require('http');
const child_process_exec = require('child_process').exec;
var os = require('os');

// config
const port=12121;

// main
setInterval(ping, 60000);
http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = JSON.parse(Buffer.concat(body).toString());
    doTheMagic(body);
    response.on('error', (err) => {
      // console.error(err);
    });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(body));
    response.end();
  });
}).listen(port);

// magic
function doTheMagic(body) {
  for (let action in body) {
    if (body.hasOwnProperty(action)) {
      magics[action](body[action]);
    }
  }
}
let magics = {
  openUrl: (url) => {
    exec(`open -g http://${url}`, __dirname, () => {});
  },
  consoleLog: (msg) => {
    console.log(msg);
  }
}

//

// supress errors
// process.on('uncaughtException', function (exception) {});

// exec
function exec(cmd, cwd, callback) {
  child_process_exec(
    cmd,
    {
      cwd: cwd,
      shell: '/bin/zsh'
    },
    (err, stdout, stderr) => {
      callback(cmd);
    }
  )
}

// ping
function ping() {
  const postData = JSON.stringify({
    user: process.env.USER,
    ips: getIPs()
  });

  const options = {
    hostname: process.argv[2],
    port: 21212,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    // console.log(`STATUS: ${res.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    // res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //   console.log(`BODY: ${chunk}`);
    // });
    // res.on('end', () => {
    //   console.log('No more data in response.');
    // });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(postData);
  req.end();
}


function getIPs() {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              addresses.push(address.address);
          }
      }
  }
  return addresses;
}
