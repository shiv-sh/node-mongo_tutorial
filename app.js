const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(bodyParser.json());
app.use(cors());
// Middlewares
// app.use('/post', () => {
//     console.log("Hello this is post middleware");
// });


// IMPORT ROUTES

const postRoute = require('./routes/posts');




//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
});

app.use('/posts',postRoute);


// Connect to database

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to Db")
    })

//LISTEN
app.listen(3000,()=> console.log("app listening on 3000")) 