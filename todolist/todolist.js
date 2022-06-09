const express = require('express');
const morgan = require('morgan');
const todolistRouter = require('./app/lists');

const PORT = 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/todolist', todolistRouter);

app.use(function (error, request, response, next) {
    response.status(error.statusCode || 500)
        .send(error.message || "Unknown Error");
});

app.route('/todolist')
.get((request, response) => response.send('lists'))
.post((request, response) => response.send('new list'))
.put((request, response) => response.send('list updated'))
.delete((request, response) => response.send('list deleted')); 

const server = app.listen(PORT, () => {
            console.log(`Server up on ${server.address().address}:${PORT}`);
});