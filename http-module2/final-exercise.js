/* Create a simple Todo API
 * 
 * Your task is to create an API using the http module in Node.js to allow for CRUD functionality against 
 * todo items, that is the ability to:
 * 
 * - Create
 * - Read
 * - Update
 * - Delete
 * 
 * todo items.
 * 
 * The structure you choose is upto you for this exercise, you may do this all in one file or split your work
 * into multiple files (separation of concerns).
 * 
 * NOTE: As we have not covered path parameters with the HTTP module, you must make use of query parameters instead. You will also need to use the
 *       request body for sending payloads of data for creating or modifying resources on the API and the response body for returning data.
 */
const http = require('http');
const URL = require('url');

const host = 'localhost';
const port = 3000;

const create = (request, response) => {
    const url = URL.parse(request.url, true);
    const list = url.query.list;
    const items = url.query.items;

    response.statusCode = 200;

    response.setHeader('Content-type', 'text/html');
    response.write(`<ul>`);
    response.write(`<h1>${list}</h1>`)
    for (let i = 1; i <= items; i++) {
        response.write(`<li>${i} </li>`);
    }
    response.write(`</ul>`);
    response.end();
}

const deleteList = (request, response) => {
    const url = URL.parse(request.url, true);
    const list = url.query.list;

    response.statusCode = 204;

    response.delete(list);
}

const notFound = (request, response) => {
    response.statusCode = 404;
    response.setHeader('Content-type', 'text/html');
    response.end('<h1>Page not found</h1>');
}

const requestHandler = (request, response) => {
    const url = URL.parse(request.url, false);

    switch (url.pathname) {
        case "/create":
            create(request, response);
            break;
        case "/read":
            read(request, response);
            break;
        case "/update":
            update(request, response);
            break;
        case "/delete":
            deleteList(request, response);
            break;
        default:
            notFound(request, response);
            break;
    }
}

const server = http.createServer(requestHandler);

server.listen(port, host, () => {
    console.log(`Server up on ${host}:${port}`);
});