const express = require('express');

const router = express.Router();

let todolist = [{"id": 1, "todo": "Clean"}, {"id": 2, "todo": "Iron clothes"}];
let idCounter = 3;

function response(res, data, status = 200, contentType = 'application/json') {
    res.contentType(contentType).status(status).send(data);
}

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const todo = todolist.find(todo => todo.id == id);
    if(todo) {
        return response(res, JSON.stringify(todo));
    }
    response(res, `todo with id ${id} not found`, 404, 'text/plain');
});

router.get('/', (req, res) => response(res, JSON.stringify(todolist)));

router.post('/', (req, res) => {
    const todo = req.body.todo;
    if(todo) {
        const newTodo = {id: idCounter++, todo};
        todolist.push(newTodo);
        return response(res, JSON.stringify(newTodo));
    }
    response(res, `Bad request data.`, 400, 'text.plain');
});

router.put('/', (req, res) => {
    const id = req.params.id;
    const todo = req.body.todo;
    if(todo) {
        const newTodo = {id: idCounter++, todo};
        todolist.put(todo);
        return response(res, JSON.stringify(newTodo));
    }
    response(res, `Bad request data.`, 400, 'text.plain');
});

router.delete('/:id', (req, res) => {
    const todo = todolist.find(todo => todo.id == req.params.id);
    const index = todolist.indexOf(todo);

    if (index > -1) {
        todolist.splice(index, 1);
        delete todo.id;
        return response(res, JSON.stringify(todo));
    }
    response(res, `todo with id ${id} not found`, 404, 'text.plain');
});

module.exports = router;