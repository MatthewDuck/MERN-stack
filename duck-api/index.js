const express = require('express');
const morgan = require('morgan');
const duckRouter = require('./router/duckrouter');

const PORT = process.env.PORT || 3000;
const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use('/ducks', duckRouter);

app.use(function (error, request, response, next) {
    response.status(error.statusCode || 500)
        .send(error.message || "Unknown Error");
});

app.route('/ducks')
    .get((request, response) => response.send('Ducks'))
    .post((request, response) => response.send('New Duck'))
    .put((request, response) => response.send('Duck updated'))
    .delete((request, response) => response.send('Duck deleted'));

const server = app.listen(PORT, () => {
    console.log(`Server up on ${server.address().address}:${PORT}`)
});