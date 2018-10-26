const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const webRouter = require('./app/router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', webRouter);

app.listen(3000, () =>
    console.log('启动服务 8080'));