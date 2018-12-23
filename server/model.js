const express = require('express');
const userRouter = require('./user');
const mongoose = require('mongoose');
// 链接mongodb
const url = 'mongodb://localhost:27017/weny_chat';
mongoose.connect(url);
// mongoose.connection.on('connected', function(){
//     console.log('success')
// })
const models = {
    user: {
        'user': {'type': String, 'require': true},
        'pwd': {'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        // 头像
        'avatar': {'type': String},
        // 个人简介
        'desc': {'type': String},
        // 要找的工作
        'title': {'type': String},
        // 如果为boss 还有两个字段
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: {

    }
}

for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}