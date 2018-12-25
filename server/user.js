const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model.js')
const User = model.getModel('user');

const filter = {pwd: 0, _v: 0}
Router.get('/list', function(req, res) {
    // User.remove({}, function(err, doc){});
    User.find({}, function(err, doc){
        return res.json(doc)
    })
})
Router.get('/info', function(req, res) {
    // 进行用户cookie的校验 
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({"code": 1})
    }
    User.findOne({_id: userid},filter, function(err, doc) {
        if (err) {
            return res.json({code: 1, mes: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
    // if (doc) {
    //     return res.json({code: 0, })
    // }
})
Router.post('/register', function(req, res) {
    // 进行用户cookie的校验 
    const {type, user, pwd} = req.body;
    User.findOne({user}, function(err, doc){
        if(doc) {
            return res.json({code: 1, mes: '用户名已存在'})
        }
        User.create({user, type, pwd: md5Fun(pwd)}, function(err, doc){
            if(err) {
                return res.json({code: 1, mes: '后端出错了'})
            }
            return res.json({code: 0, })
        })
    })
    // return res.json({"code": 1})
})

Router.post('/login', function(req, res) {
    const { user, pwd} = req.body;
    User.findOne({user, pwd: md5Fun(pwd)}, filter, function(err, doc) {
        if (!doc) {
            return res.json({code: 1, mes: '用户名不存在或者密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})

function md5Fun (pwd) {
    const salt = 'zheshi_react_13yyyDDDfkdsja_okIl';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;