require('dotenv').config();
require('express-async-errors')

//async errors

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/product');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// ?Middleware
app.use(express.json());

// ?Routes
app.get('/', (req, res) => {
    res.send(
        '<h1>Store API</h1> <a href= "/api/v1/products">Products route</a>'
    );
});

app.use('/api/v1/products', productsRouter);

// ?Products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        // connect DB
        await connectDB(process.env.MONGO_URI);
        app.listen(
            port,
            console.log(`Server is listening to the port ${port}`)
        );
    } catch (error) {
        console.log(error);
    }
};
start();
