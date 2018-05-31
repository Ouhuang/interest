const User = require("../service/user")


const reg = async (req, res) => {
    var docs = await User.getLoginName(req.body.userName);

    if (docs !== null)
        return res.json({
            msg: '账号重复',
            type: false
        })

    var adduser = await User.addUser(req.body)

    res.json({
        type: true,
        msg: adduser
    })
}

module.exports = (req, res) => reg(req, res)