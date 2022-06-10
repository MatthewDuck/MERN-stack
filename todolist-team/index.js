const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const todolistRouter = require('./router/todolistrouter');
const DATABASE = 'test';
const DB_URI = `mongodb://localhost:27017/${DATABASE}`;

const PORT = process.env.PORT || 3000;
const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use('/list', todolistRouter);

app.use(function (error, request, response, next) {
    if (error.name === 'ValidationError') error.statusCode = 400;
    
    response.status(error.statusCode || 500)
        .send(error.message || "Unknown Error");
});

function main() {
    mongoose.connect(DB_URI, {}, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Connected to database');

            app.listen(PORT, () => {
                console.log(`Server up on ${PORT}`)
            });
        }
    });

}

main();