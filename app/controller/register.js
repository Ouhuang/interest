const User = require("../service/user")


const reg = async (req, res) => {
    const docs = await User.getLoginName(req.body.loginName);

    if (docs.length)
        return res.json({
            msg: '账号重复',
            type: false
        })

    const { check, type } = await User.addUser(req.body);

    res.json({
        type: !type,
        msg: check
    })
}

module.exports = (req, res) => reg(req, res)