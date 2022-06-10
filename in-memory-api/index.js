const express = require('express');
const morgan = require('morgan');
const versionOneRouter = require('./api/v1/route/version-one-router');

const PORT = process.env.PORT || 3000;
const app = express();

if(process.env.NODE_ENV !== "PRODUCTION") {
    console.log("=== PRODUCTION | INACTIVE ===");
    app.use(morgan('dev'));
} else {
    console.log("=== PRODUCTION | ACTIVE ===");
}

app.use(express.json());
app.use("/v1", versionOneRouter);
app.use((error, request, response, next) => {
    console.error(error.message);

    if(!error.statusCode) error.statusCode = 500;

    return response.status(error.statusCode).json({
        message: error.message || 'Something went wrong'
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server up on ${server.address().address}:${PORT}`)
});