const express = require('express');
const port = 8000;
const app = express();

// connecting to the database
const db = require('./config/mongoose');

//import routes
const indexRouter = require('./routes/index');

// Middleware
app.use(express.json());

// Routes
app.use('/', indexRouter);

app.listen(port, function (err) {
    if (err) {
        console.log("error in express", err);
        return;
    }
    console.log(`express running successfull in: ${port}`);
})


