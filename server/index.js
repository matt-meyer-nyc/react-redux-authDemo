const express = require ('express');
const http = require ('http');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose')
const cors = require('cors');
// const passport = require('passport');


//DB set up
mongoose.connect('mongodb://localhost:auth/auth')
  //internally creates new databse inside mongo called 'auth'


//App Setup
    //...app.use initialized these dependencies as middleware
app.use(morgan('combined'));
    //...morgan is for logging incoming request (great for debuggin)
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
    //...parses incoming requests into JSON (attemps not matter what request type is)
// app.use(passport.initialize());

router(app);
    //call router with app

//Serve Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listing on: ', port);
