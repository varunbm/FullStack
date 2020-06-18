const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Cors middleware, 
app.use(cors());

// A Middleware which allow us to parse json, our server is going to receive and send json.
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});

const exerciseRouter = require('./api_routes/exercises');
const userRouter = require('./api_routes/users');

app.use('/exercise',exerciseRouter);
app.use('/users',userRouter);

app.listen(port,() => {
    console.log(`Server is running on port: ${port}`);
});