const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// io work with express
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket){
    // console.log('socket connecting');
    socket.on('sendMessage', function(data){
        console.log(data)
        io.emit('receiveMessage', data)
    })
})
const userRouter = require('./user');
// const 
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter)
server.listen(9090, function(){
    console.log('listen at port 9090')
})