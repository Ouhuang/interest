const jwt = require('jsonwebtoken')
const fs = require('fs')

const {
    setAccessToken
} = require('../service/token')
const {
    returnTem
} = require('../utils/util')
const { User } = require('../models')

module.exports = (req, res) => {
    const {
        Username,
        Password
    } = req.body

    User.findOne({
        login_name: Username
    }).find((err, data) => {
        if (err)
            return console.log(err)

        if (data.length === 0 || data[0].pass_word !== Password)
            return res.send({
                err: true,
                msg: '用户名或密码错误'
            })

        //生成 refresh token 
        const private = fs.readFileSync('public/rsa/private.key');
        const refresh_token = jwt.sign({
            iss: 'emm',
        }, private, {
                algorithm: 'RS256',
                expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 //一月
            })

        //生成 access token
        const access_token = setAccessToken(refresh_token, Username);

        let token = JSON.stringify({
            refresh_token,
            access_token
        })

        res.header('Authorization', Buffer.from(token).toString('base64'));

        [data] = data;
        res.send(returnTem({
            msg: '登录成功',
            data: {
                _id: data._id,
                email: data.email,
                name: data.user_name,
                userName: data.login_name
            }
        }))
    })
}