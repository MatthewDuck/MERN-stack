const { response, request } = require('express');
const express = require('express');
const calculator = require('./calculator');
const router = express.Router();

function doUnaryOperation(request, response) {
    const num1 = Number(request.query.num1);

    if (isNaN(num1)) {
        response.status(400).send("Inputs must be numerical");
        return;
    }

    let result;
    switch (request.path.toLowerCase()) {
        case "/squared":
            result = calculator.squared(num1);
            break;
        case "/squareroot":
            result = calculator.squareroot(num1);
            break;
    }

    return response.json({
        "operation": request.path,
        "num1": num1,
        "result": result
    });
}

function doBinaryOperation(request, response) {
    const num1 = Number(request.query.num1);
    const num2 = Number(request.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.status(400).send("Inputs must be numerical");
        return;
    }

    let result;
    switch (request.path.toLowerCase()) {
        case "/add":
            result = calculator.add(num1, num2);
            break;
        case "/subtract":
            result = calculator.subtract(num1, num2);
            break;
        case "/multiply":
            result = calculator.multiply(num1, num2);
            break;
        case "/division":
            result = calculator.divide(num1, num2);
            break;
        case "default":
            result = 'Not valid operator';
            break;
    }

    return response.json({
        "operation": request.path,
        "num1": num1,
        "num2": num2,
        "result": result
    });
}

router.get('/add', doBinaryOperation);
router.get('/subtract', doBinaryOperation);
router.get('/multiply', doBinaryOperation);
router.get('/divide', doBinaryOperation);
router.get('/squared', doUnaryOperation);
router.get('/squareroot', doUnaryOperation);

module.exports = router;
