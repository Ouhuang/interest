const { User } = require("../models");
const utility = require('utility');

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
exports.addUser = ({ userName, loginName, passWord, email }) => {
    return new Promise((res, rej) => {
        const user = new User({
            email: email,
            user_name: userName,
            pass_word: passWord,
            login_name: loginName
        });
        user.save();
        res('添加成功')
    })
}