const Mock = require('mockjs');
const format = require('./format')

module.exports = (req, res) => {
    let data;
    if (req.file) {
        data = req.file.buffer.toString()
        return res.send(Mock.mock(data))
    }
    data = format(req.body)
    res.send(Mock.mock(data))
}