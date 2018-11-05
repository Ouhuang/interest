const jwt = require('jsonwebtoken')
const fs = require('fs')

const secret = 'EMMTOKEN_1.0'

module.exports = (req, res, next) => {
    if (req.path === '/login')
        return next();

    const Authorization = req.headers.Authorization;
    console.log(Authorization)
}


exports.secret = secret