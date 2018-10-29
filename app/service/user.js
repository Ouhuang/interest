const { User } = require("../models");
const utility = require('utility');

const { checkUser } = require('./rules')

exports.getUserName = (name) => {
    return new Promise((res, rej) => {
        User.find({ user_name: name }).find((err, data) => {
            if (!err)
                res(data)
            else
                rej(err)
        })
    })
}
exports.getLoginName = (name) => {
    return new Promise((res, rej) => {
        User.find({ login_name: name }).find((err, data) => {
            if (!err)
                res(data)
            else
                rej(err)
        })
    })
}
exports.addUser = ({ userName, loginName, passWord, email }) => {

    return new Promise((res, rej) => {
        const check = checkUser({
            user: userName,
            account: loginName,
            password: passWord,
            email,
        })
        if (check) return res({
            type: true,
            check
        });
        const user = new User({
            email: email,
            user_name: userName,
            pass_word: passWord,
            login_name: loginName
        });
        user.save();
        res({ check: '添加成功' })
    })
}