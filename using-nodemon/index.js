const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log("=== PRODUCTION | INACTIVE ===");
    app.use(morgan('dev'));
} else {
    console.log("=== PRODUCTION | ACTIVE ===");
}

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

const server = app.listen(PORT, function() {
    console.log(`Server up on ${PORT}`);
});