const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// userRouter 要提前到model, 已踩坑
const userRouter = require('./user');

const model = require('./model.js')
const Chat = model.getModel('chat');
// io work with express
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('sendMessage', function(data){
        const { from, to, message} = data;
        const chat_id = [from,to].sort().join('_');
        Chat.create({chat_id, from, to, message}, function(err, doc){
            io.emit('receiveMessage', Object.assign({}, doc._doc));
        })
    })
})
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