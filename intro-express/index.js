const { response, Router } = require('express');
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./app/users');

const port = 3000;
const app = express();
const router = express.Router();

let userList = [{"id": 1, "name": "Bob"}, {"id": 2, "name": "Sam"}];
let idCounter = 3;

function response(res, data, status = 200, contentType = 'application/json') {
    res.contentType(contentType).status(status).send(data);
}

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.get('/date', (req, res) => {
//     let date = new Date();
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
//     res.send(`${day}:${month}:${year}`);
// });

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = userList.find(user => user.id == id);
    if(user) {
        res.contentType('application/json').status(200).send(JSON.stringify(user));
        return;
    }
    res.contentType(text/plain).status(404).send(`User with id ${id} not found`);
    // console.log(`Read by ID: ${id}`);
    // res.send(`Read User: ${id}`);
});

router.get('/', (req, res) => {
    res.contentType('application/json')
    .status(200)
    .send(JSON.stringify(users));
    // const page = req.query.page;
    // const pageSize = req.query.pageSize;
    // const output = `Returning page ${page} consisting of ${pageSize} users`
    // console.log(output);
    // res.send(output);
});

router.post('/', (req, res) => {
    const name = req.body.name;
    if(name) {
        const newUser = {id: idCounter++, name};
        userList.push(newUser);
        return response(res, JSON.stringify(newUser));
    }
    response(res, `Bad request data.`, 400, 'text.plain');
});

router.put('/', (req, res) => {


});

router.delete('/:id', (req, res) => {
    const user = userList.find(user => user.id == req.params.id);
    const index = userList.indexOf(user);

    if (index > -1) {
        users.splice(index, 1);
        delete user.id;
        return response(res, JSON.stringify(user));
    }
    response(res, `User with id ${id} not found`, 404, 'text.plain');
});

module.exports = router;

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.static('private'));
app.use(express.static('other'));
app.use(express.json());
app.use('/name', userRouter);

const server = app.listen(port, () => {
            console.log(`Server up on ${server.address().address}:${port}`);
});