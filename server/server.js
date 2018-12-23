const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use('/user', userRouter)
app.use(cookieParser());
app.use(bodyParser.json());
app.listen(9090, function(){
    console.log('port 9090')
})