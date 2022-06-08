const http = require('http');
const morgan = createRequire('morgan');

const host = 'localhost';
const port = 3000;

const logger = morgan('dev');

const server = http.createServer((req, res) => {
    logger(req, res, err => {
        res.setHeader('Content-Type', 'text/plain');
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end('Something went wrong');
            return;
        }
        res.statusCode = 200;
        res.end('Hello');
    });
});

server.listen(port, host, () => {
    console.log(`Server up on ${host}:${port}`);
});