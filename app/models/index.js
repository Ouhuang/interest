const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/myapp'); //连接数据库

require('./user');


exports.User = mongoose.model('User');

