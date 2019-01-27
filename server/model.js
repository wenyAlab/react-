const express = require('express');
const userRouter = require('./user');
const mongoose = require('mongoose');
// 链接mongodb
const url = 'mongodb://localhost:27017/weny_chat';
mongoose.connect(url);
// mongoose.connection.on('connected', function(){
//     console.log('success')
// })
// 注意： models中的字段名称必须对应，已踩坑，之前返回的数据中一直没有companyName和job，原因是这里字段名写错了
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
        'job': {'type': String},
        // 如果为boss 还有两个字段
        'companyName': {'type': String},
        'money': {'type': String}
    },
    chat: {
        'from': {'type': String, 'require': true},
        'to': {'type': String, 'require': true},
        'create_time': {'type': Date, 'require': true, 'default': new Date().getTime()},
        'message': {'type': String, 'require': true, 'default': ''},
        'is_read': {'type': Boolean, 'require': true, 'default': false},
        'chat_id': {'type': String, 'require': true},
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