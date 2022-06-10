const express = require('express');
const router = express.Router();

let idCounter = 3;
const todolist = [
    {
        id: 1,
        title: "chores",
        desc: "Clean the house",
        categories: ["Cleaning", "House work"],
        status: "Todo"
    }, {
        id: 2,
        title: "Ironing",
        desc: "Iron clothes for tomorrow",
        categories: ["House work"],
        status: "Done"
    }
];


router.get('/:id', (request, response, next) => {
    const id = Number(request.params.id);

    if (isNaN(id)) return next({
        statusCode: 400,
        message: `ID must be a number`
    });

    const todo = todolist.find(todo => todo.id == id);

    if (!todo) return next({
        statusCode: 404,
        message: `List with id:${id} not found`
    });

    response.status(302).json(todo);

});

router.get('/', (request, response) => {
    response.status(200).json(todolist);
});

router.post('/', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400,
        message: `Body cannot be empty`
    });

    const newTodo = request.body;
    newTodo.id = idCounter++;
    todolist.push(newTodo);
    response.status(201).json(newTodo);
});

router.put('/', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400,
        message: `Body cannot be empty`
    });

    const id = Number(request.params.id);

    if (isNaN(id)) return next({
        statusCode: 400,
        message: `ID must be a number`
    });

    const updatetodo = todolist.find(todo => todo.id == id);

    if (!updatetodo) return next({
        statusCode: 404,
        message: `List with id:${id} not found`
    });

    updatetodo.title = request.body.title;
    updatetodo.desc = request.body.desc;
    updatetodo.categories = request.body.categories;
    updatetodo.status = request.body.status;
    response.status(200).json(updatetodo);
});

router.patch('/', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400,
        message: `Body cannot be empty`
    });

    const id = Number(request.params.id);

    if (isNaN(id)) return next({
        statusCode: 400,
        message: `ID must be a number`
    });

    const updatetodo = todolist.find(todo => todo.id == id);

    if (!updatetodo) return next({
        statusCode: 404,
        message: `List with id:${id} not found`
    });

    updatetodo.categories.data = request.body.categories.data;
    updatetodo.status = request.body.status;
    response.status(200).json(updatetodo);
});

router.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);

    if (isNaN(id)) return next({
        statusCode: 400,
        message: `ID must be a number`
    });

    const index = todolist.findIndex(todo => todo.id == id);

    if (index == -1) return next({
        statusCode: 404,
        message: `List with id:${id} not found`
    });

    todolist.splice(index, 1);
    response(`List deleteed`, 200, 'text.plain');
});

module.exports = router;