const jwt = require('jsonwebtoken')
const fs = require('fs')

const {
    secret
} = require('../service/token')
const {
    User
} = require('../models')

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
        const secrets = refresh_token.split('.')[2] + secret
        const access_token = jwt.sign({
            user_name: Username
        }, secrets, {
            expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 //一小时
        })


        res.header('Authorization', JSON.stringify({
            refresh_token,
            access_token
        }))

        res.send({
            err: false,
            msg: '登陆成功'
        })
    })
}