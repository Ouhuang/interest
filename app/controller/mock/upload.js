const multer = require('multer')

const mock = require('./index')

var storage = multer.memoryStorage()
const upload = multer({
    storage,
    fileFilter(req, file, next) {
        if (['text/javascript', 'text/plain', 'application/json'].includes(file.mimetype)) {
            next(null, true)
        } else {
            next(new Error('type error'), false)
        }
    }
});

const single = upload.single('file')


module.exports = (req, res) => {
    single(req, res, (err) => {
        if (err && err.message === 'type error') {
            return res.json({
                error: 'type erroe',
                msg: '请检查文件类型'
            })
        }
        mock(req, res)
    })
}