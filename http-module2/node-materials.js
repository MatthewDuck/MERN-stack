const http = require('http');
const fs = require('fs').promises;

const hostname = 'localhost';
const port = 3000;

let index;

function ok(html, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
}

const requestHandler = (req, res) => ok(index, res);

const server = http.createServer(requestHandler);

fs.readFile(__dirname + 'static/index.html')
    .then(data => {
        index = data;
        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    })
    .catch(error => {
        console.error(`Could not find static/index.html: ${error}`);
        process.exit(1);
    })

// const server = http.createServer((req, res) => {
//     console.log('---INBOUD REQUEST---');
//     console.log(`IP address: ${req.socket.remoteAddress}`);
//     console.log(`Request URL: ${req.url}`);
//     console.log(`Request method: ${req.method}\n`);

//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('Hello World\n');
// })

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// })

// const requestHandler = (req, res) => {
//     fs.readFile(__dirname + 'static/index.html', (err, data) => {
//         if(err) {
//             console.error(err.message);
//             res.statusCode = 404;
//             res.setHeader('Content-Type', 'text/html');
//             res.end('<html><head><title>Resource not found</title></head><body><h1>Error: Resource not found</h1></body></html>');
//             return;
//         };

//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         res.end(data);
//     });
// }

// const requestHandler = (req, res) => {
//     fs.readFile(__dirname + 'static/index.html')
//         .then(data => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'text/html');
//             res.end(data);
//         })
//         .catch(error => {
//             console.error(err.message);
//             res.statusCode = 404;
//             res.setHeader('Content-Type', 'text/html');
//             res.end('<html><head><title>Resource not found</title></head><body><h1>Error: Resource not found</h1></body></html>');
//         });
// }