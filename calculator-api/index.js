const express = require('express');
const calculator = require('./calculator');
const calculatorRouter = require('./calculator-router');

const port = process.env.PORT || 3000;
const app = express();

app.use('/', calculatorRouter);

const server = app.listen(port, function() {
    console.log(`Server up on port ${port}`);
})