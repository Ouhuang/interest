const jwt = require('jsonwebtoken')
const fs = require('fs')

const {
    returnTem
} = require('../utils/util')

const secret = 'EMMTOKEN_1.0'

const setAccessToken = (refresh_token, user_name) => {
    const secrets = Buffer.from(refresh_token + secret).toString('hex');

    return jwt.sign({
        user_name
    }, secrets, {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 //一小时
    })
}

const verifyToken = (token, type) => {
    token = Buffer.from(token, 'base64').toString();
    let secretKey;

    try {
        token = JSON.parse(token);
    } catch (e) {
        return {
            type: false,
            errCode: 0,
            message: 'token error'
        };
    }

    if (!type) {
        secretKey = Buffer.from(token.refresh_token + secret).toString('hex');
        token = token.access_token
    } else {
        secretKey = fs.readFileSync('../../public/rsa/public.key')
        token = token.refresh_token
    }

    return jwt.verify(token, secretKey, (err, data) => {
        if (err) {
            return {
                ...err,
                type: false,
                errCode: err.expiresAt ? 1 : 2,
            }
        }
        return {
            type: true,
            data
        };
    })
}


exports.setAccessToken = setAccessToken;
exports.verifyToken = verifyToken;
exports.secret = secret;

exports.tokenMid = (req, res, next) => {
    if (req.path === '/login')
        return next();

    const Authorization = req.headers.authorization;

    if (!Authorization) return res.send(returnTem({
        err: 1,
        msg: '请登录后尝试'
    })) //如果token不存在

    let token = verifyToken(Authorization)

    if (!token.type) return res.send(token);

    next();
}