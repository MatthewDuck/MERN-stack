const { request } = require('express');
const express = require('express');
const List = require('../model/List');
const router = express.Router();

router.get('/', async (request, response, next) => {
    response.status(200).json(await List.find());
});

router.get('/:id', async (request, response, next) => {
    const id = request.params.id;
    const list = await List.findById(request.params.id);
    if (list) {
        return response.json(await List.findById(request.params.id));
    } else {
        return next({
            statusCode: 404,
            message: `List with id:${id} not found`
        });
    }
});

router.post('/', async (request, response, next) => {
    try {
        if (Object.keys(request.body).length == 0) return next({
        statusCode: 400,
        message: `Body cannot be empty`
    });

    await newList.save();
    response.status(201).json(newList);
    } catch (err) {
        next(err);
    }  
});

router.put('/:id', async (request, response, next) => {
    try {
        if (Object.keys(request.body).length == 0) return next({
            statusCode: 400,
            message: `Body cannot be empty`
        });

        const list = await List.updateOne({ _id: request.params.id }, request.body, {
            runValidators: true
        });

        if (list) {
            response.status(200).json(await List.findById(request.params.id));
        } else {
            next({ statusCode: 404, message: `List with id ${request.params.id} does not exist` });
        }
    } catch (err) {
        next(err);
    }
});

router.patch('/status/:id', async (request, response, next) => {
    try {
        List.updateOne(
            { _id: req.params.id },
            { status: req.params.status },
            { runValidators: true }
        );
        response.status(200).json(list);
    } catch (err) {
        next (err);
    }
});

router.delete('/:id', async (request, response, next) => {
    const list = await List.findByIdAndDelete(request.params.id);

    if (list) {
        response.status(200).json(list);
    } else {
        next({
            statusCode: 404,
            message: `List with id:${request.params.id} not found`
        });
    }
});

module.exports = router;