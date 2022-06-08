const express = require('express');
const todolistRouter = require('./app/lists');

const port = 3000;
const app = express();

app.use(express.json());
app.use('/todolist', todolistRouter);
app.use('/todolost', logger);

app.route('/todolist')
.get((req, res) => res.send('lists'))
.post((req, res) => res.send('new list'))
.put((req, res) => res.send('list updated'))
.delete((req, res) => res.send('list deleted')); 

function logger(req, res, next) {
    console.log(`${req.method} ${req.path}`);
    next();
}

const server = app.listen(port, () => {
            console.log(`Server up on ${server.address().address}:${port}`);
});