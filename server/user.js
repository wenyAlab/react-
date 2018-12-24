const express = require('express');
const Router = express.Router();
const model = require('./model.js')
const User = model.getModel('user');

Router.get('/list', function(req, res) {
    User.find({}, function(err, doc){
        return res.json(doc)
    })
})
Router.get('/info', function(req, res) {
    // 进行用户cookie的校验 
    return res.json({"code": 1})
})
Router.post('/register', function(req, res) {
    // 进行用户cookie的校验 
    const {type, user, pwd} = req.body;
    User.findOne({user}, function(err, doc){
        if(doc) {
            return res.json({code: 1, mes: '用户名已存在'})
        }
        User.create({user, type, pwd}, function(err, doc){
            if(err) {
                return res.json({code: 1, mes: '后端出错了'})
            }
            return res.json({code: 0, })
        })
    })
    // return res.json({"code": 1})
})

module.exports = Router;