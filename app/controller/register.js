const User = require("../service/user")


const reg = async (req, res) => {
    var docs = await User.getUserName(req.body.userName);
    if (docs !== null)
        return res.json({
            msg: '用户名重复'
        })
    var adduser = await User.addUser(req.body)
    res.json({
        data: adduser
    })
}

module.exports = (req, res) => reg(req, res)