const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model.js')
const User = model.getModel('user');

const filter = {pwd: 0, _v: 0}
Router.get('/list', function(req, res) {
    const { type } = req.query;
    // User.deleteOne({user: 'boss'}, function(err, doc){});
    User.find({type}, function(err, doc){
        return res.json({code: 0, data: doc})
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
        const userModel = new User({user, type, pwd: md5Fun(pwd)});
        userModel.save(function(err, doc) {
            if (err) {
                return res.json({code: 1, mes: '后端出错了'})
            }
            const {user, _id, type} = doc;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {user, _id, type}})
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

Router.post('/saveinfo', function(req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({code: 1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        if (!doc) {
            return res.json({code: 1, mes: '数据库无此信息，更新失败'})
        }
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type,
        }, body)
        return res.json({code: 0, data: data})
    })
})

function md5Fun (pwd) {
    const salt = 'zheshi_react_13yyyDDDfkdsja_okIl';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;